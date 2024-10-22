
const base_url = 'https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py?tz=Asia%2FKolkata&missing=null&';



const getData = async(data,station) =>{
    let n = 1
    url = `${base_url}data=${data}&station=${station}`
    if(start != "today"){
        y1 = start.slice(0,4);
        m1 = start.slice(5,7);
        d1 = start.slice(8);
        y2 = end.slice(0,4);
        m2 = end.slice(5,7);
        d2 = end.slice(8);        
        url += `&year1=${y1}&month1=${m1}&day1=${d1}&year2=${y2}&month2=${m2}&day2=${d2}`

        let days = getDaysBetweenDates(start,end)
        if(days < 10) n = 2
        else if(days<20) n=3
        else if(days<40) n=6
        else if(days<60) n=8
        else if(days<100) n=12
        else if(days < 150) n = 16
        else if(days<200) n = 20
        else if(days<300) n = 30
        else n = 100
        
    }else{
        url += `&hours=24`
    }
  





    try {
        const response = await fetch(url);
        const result = await response.text();
        let res = JSON.parse(csvJSON(result));
        
        
        var label = []
        for(i in res){
            if(start != "today" && i%n != 0){
                continue
            }
            if(res[i]["valid"] !== undefined){
                label.unshift(res[i]["valid"]);
            
            }
        }
        timeData = label.map(row => timeConvert(row,"time"));
        monthData = label.map(row => timeConvert(row,"months"));
        timeStamp = label.map(row => timeConvert(row,"all data"));

        var dataSet = []
        for(i in res){
            if(start != "today" && i%n != 0){
                continue
            }
            if(res[i][data] !== undefined){
                dataSet.unshift(res[i][data]);
            }
        }   
        
        if(data == "dwpc"){
            return dataSet
        }else if(data=="feel"){
            return dataSet
        }else if(data=="tmpc"){ 
            let ans = `${res[res.length-2]["tmpc"]}`;
            infoBoxCTemp.innerText = `${ans.slice(0,2)} °C`
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

const updateInfoBar = async (code) =>{
    infoBoxSC.innerText = code;
    datas = ["drct","alti"]
    for(z of datas){
        url = `${base_url}data=${z}&station=${code}&hours=24`
        try {
            const response = await fetch(url);
            const result = await response.text();
            let res = JSON.parse(csvJSON(result));
            
            let ans = `${res[res.length-2][z]}`;
            if(z=="drct" && ans != null){
                directions = {"0.00":"North","90.00":"West","180.00":"South","270.00":"East"};
                if(Object.keys(directions).includes(ans)){
                    ans = directions[ans];
                }else{
                    if(ans>270) ans = "North-East"
                    else if(ans>180) ans = "South-East"
                    else if(ans>90) ans = "South-West"
                    else ans = "North-West"
                }



                infoBoxWD.innerText = `${ans}`
            }else if(z=="alti"){
                infoBoxAlti.innerText = `${ans} inches`
            }
            
            

        } catch (error) {
            console.error(error);
        }
    }
}


/* Suggestion System */
const searchInput = document.querySelector("#search-input");
const homeButton = document.querySelector('#home-button');
const suggestions = Object.keys(stationCodes);
const suggestionBox = document.querySelector(".search-suggestions");
const navbarName = document.querySelector("#selected-name p");
const navbar2 = document.querySelector("#navbar-2-container");
const maincontent = document.querySelector("#main-content-container");
const defaultpage = document.querySelector(".default-page");
const infoBoxSC = document.querySelector("#info-box-station-code");
const infoBoxAlti = document.querySelector("#info-box-altitude");
const infoBoxWD = document.querySelector("#info-box-wind-direction");
const infoBoxCTemp = document.querySelector("#info-box-curr-temp");
const updateButton = document.querySelector("#update-button");
const updateTodayButton = document.querySelector("#today-button");

var start = "today";
var end = "today";
var code;

function loadPage(){
    if(tempChartCanvas != null){
        tempChartCanvas.destroy();
        relhChartCanvas.destroy();
        skntChartCanvas.destroy();
        skyl2ChartCanvas.destroy();
        vsbyChartCanvas.destroy();
    }
    infoBoxAlti.innerText = "";
    infoBoxWD.innerText = "";
    infoBoxSC.innerText = "";
    getData("tmpc",code,start,end);
    getData("relh",code,start,end);
    getData("sknt",code,start,end);
    getData("vsby",code,start,end);
    getData("skyl2",code,start,end);
    updateInfoBar(code);
    defaultpage.classList.add("display-none");
    maincontent.classList.remove("display-none");

}

homeButton.addEventListener('click',()=>{
    navbar2.classList.add("display-none");
    maincontent.classList.add("display-none");
    defaultpage.classList.remove("display-none");
})

updateTodayButton.addEventListener('click',()=>{
    if(start != "today"){
        start = "today";
        end = "today";
        updateCheckBox();
        loadPage();
    }
})
updateButton.addEventListener('click',()=>{
    let left = fromDate.value;
    let right = toDate.value;
    if(left == right && left == getDate()){
        if(start != "today"){
        start = "today",end = "today";
        loadPage();
        }
    }else{
        if(start != left || end != right){
            start=left,end=right;
            loadPage();
        }
    }
})


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
    code = stationCodes[s];
    searchInput.value = "";
    suggestionBox.classList.add("display-none");
    loadPage();
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


const fromContainer = document.querySelector("#from-container");
const toContainer = document.querySelector("#to-container");

function getDate(){
    let now = new Date();
    now = now.toLocaleString();
    now = now.slice(0,10);
    let time = "";
    time += now.slice(-4);
    time += "-";
    time += now.slice(0,2);
    time += "-";
    time += now.slice(3,5);
    return time;
}

let todayDate = getDate();
fromContainer.innerHTML = `<input type="date" id="from" value="${todayDate}" min="1945-01-01" max="${todayDate}"></input>`
toContainer.innerHTML = `<input type="date" id="to" value="${todayDate}" min="1945-01-01" max="${todayDate}"></input>`
const toDate = document.querySelector("#to");
const fromDate = document.querySelector("#from");

function updateCheckBox(){
    let todayDate = getDate();
    fromContainer.innerHTML = `<input type="date" id="from" value="${todayDate}" min="1945-01-01" max="${todayDate}"></input>`
    toContainer.innerHTML = `<input type="date" id="to" value="${todayDate}" min="1945-01-01" max="${todayDate}"></input>`
}