function csvJSON(csv){

    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");
    for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return JSON.stringify(result); 
  }


const MONTHCODES = {"01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"};

function timeConvert(data,req){
    // example input 2024-01-01 21:00
    //               0123456789     
    //output 1 Jan 2024
    let year = data.slice(2,4);
    let day = data.slice(8,10);
    if(day[0] == 0) day.slice(1);   
    let month = MONTHCODES[data.slice(5,7)];
    let time = data.slice(-5);
    if(req == "time") return time;
    else if (req == "months") return `${day} ${month} ${year}`;
    else return `${time} - ${day} ${month} ${year}`;
}


function getDaysBetweenDates(date1, date2) {
    // Convert both dates to milliseconds
    const date1_ms = new Date(date1).getTime();
    const date2_ms = new Date(date2).getTime();

    // Calculate the difference in milliseconds
    const difference_ms = Math.abs(date2_ms - date1_ms);

    // Convert back to days and return
    return Math.ceil(difference_ms / (1000 * 60 * 60 * 24));
}