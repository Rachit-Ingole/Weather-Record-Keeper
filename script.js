
const base_url = 'https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py?hours=24&tz=Asia%2FKolkata&';

const getData = async(data,station) =>{
    url = `${base_url}data=${data}&station=${station}`
    try {
        const response = await fetch(url);
        const result = await response.text();
        let res = JSON.parse(csvJSON(result));
        
        
        var label = []
        for(i in res){
            if(res[i]["valid"] !== undefined){
                label.unshift(res[i]["valid"]);
            
            }
        }
        timeData = label.map(row => timeConvert(row,"time"));
        monthData = label.map(row => timeConvert(row,"months"));
        timeStamp = label.map(row => timeConvert(row,"all data"));

        var dataSet = []
        for(i in res){
            if(res[i][data] !== undefined){
                dataSet.unshift(res[i][data]);
            }
        }   
        
        if(data == "dwpc"){
            return dataSet
        }else if(data=="feel"){
            return dataSet
        }else if(data=="tmpc"){ 
            let dewDataSet = await getData("dwpc",station);
            let feelDataSet = await getData("feel",station);
            tempChart([timeData,dataSet,monthData,timeStamp,dewDataSet,feelDataSet]);
        }else if(data=="relh"){
            relhChart([timeData,dataSet,monthData,timeStamp]);
        }else if(data=="sknt"){
            skntChart([timeData,dataSet,monthData,timeStamp]);
        }else if(data=="vsby"){
            vsbyChart([timeData,dataSet,monthData,timeStamp]);
        }else if(data=="skyl2"){
            skyl2Chart([timeData,dataSet,monthData,timeStamp]);
        }

    } catch (error) {
        console.error(error);
    }
}




/* Suggestion System */
const searchInput = document.querySelector("#search-input");
const suggestions = Object.keys(stationCodes);
const suggestionBox = document.querySelector(".search-suggestions");
const navbarName = document.querySelector("#selected-name p");
const navbar2 = document.querySelector("#navbar-2-container");
const maincontent = document.querySelector("#main-content-container");
const defaultpage = document.querySelector(".default-page");

function loadPage(s){
    let code = stationCodes[s];
    getData("tmpc",code);
    getData("relh",code);
    getData("sknt",code);
    getData("vsby",code);
    getData("skyl2",code);
    defaultpage.classList.add("display-none");
    maincontent.classList.remove("display-none");

}




searchInput.onkeyup = function (){
    let input = searchInput.value;
    if(input.length > 2){

        suggestionBox.classList.remove("display-none");
        var res = suggestions.filter((a)=>{
            return a.toLowerCase().includes(input.toLowerCase())
        })
        let filler = "";
        for(let i of res){
            if(i==res.length-1){

            }
            filler += "<li onclick=listclicked(this)>"+ i +"<div id=station-code>" + stationCodes[i] +"</div></li>\n";
        }
        suggestionBox.innerHTML = "<ul>"+ filler +"</ul>";
    }
    else{
        suggestionBox.classList.add("display-none")
    }
}


function listclicked(list){
    let s = "";
    for(let i of list.innerHTML){
        if(i=="<"){
            break
        }
        s += i
    }
    
    navbar2.classList.remove("display-none");
    navbarName.innerText = s;
    searchInput.value = "";
    suggestionBox.classList.add("display-none");
    loadPage(s);
}


const findStationButton = document.querySelector(".default-page button");
// getData("tmpc","VABB");
// getData("relh","VABB");
// getData("sknt","VABB");
// getData("vsby","VABB");
// getData("skyl2","VABB");

findStationButton.addEventListener("click",(e)=>{
    searchInput.focus()
})


const lists = [document.querySelector("#list-1"),document.querySelector("#list-2"),document.querySelector("#list-3"),document.querySelector("#list-4")]
function addNamesToList(){
    
    let filler = "";
    let n = 0;
    let breakers = ["29","59","89","119"];
    for(i in suggestions){
        filler += "<li>" +suggestions[i]+ "</li>\n";
        if(breakers.includes(i)){
            lists[n].innerHTML = filler; 
            n+=1
            filler = "";
        }
    }
}
    

addNamesToList();

