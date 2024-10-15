const base_url = 'https://mesonet.agron.iastate.edu/cgi-bin/request/asos.py?hours=24&';

const getData = async() =>{
    let data = "tmpc"
    let station = "VABB"
    url = `${base_url}data=${data}&station=${station}`
    try {
        const response = await fetch(url);
        const result = await response.text();
        console.log(csvJSON(result));
    } catch (error) {
        console.error(error);
    }
}




/* Suggestion System */
const searchInput = document.querySelector("#search-input");
const suggestions = Object.keys(stationCodes);
const suggestionBox = document.querySelector(".search-suggestions")


searchInput.onkeyup = function(){
    let input = searchInput.value;
    if(input.length > 2){

        suggestionBox.classList.remove("hidden");
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
        suggestionBox.classList.add("hidden")
    }
}

function listclicked(list){
    
}



