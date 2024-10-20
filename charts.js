

function tempChart(data){
    const ctx = document.getElementById('tempChart');
    new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [
        {
            label: 'Temperature(°C)',
            data: data[1],
            borderWidth: 1.5,
            pointRadius: 0,
        },
        {
            label: 'Apparent Temperature(°C)',
            data: data[5].map(row => ((row-32)*5)/9),
            borderWidth: 1.5,
            pointRadius: 0,
        },
        {
            label: 'Dew Point(°C)',
            data: data[4],
            borderWidth:1.5,
            pointRadius:0,
        }
        ]

    },
    options: {
        responsive:true,
        scales: {
        x: {
            labels: data[3],
            display: false,
            ticks: {
                maxTicksLimit: 10
            },
        },
        x2: {
            labels: data[0],
            ticks: {
                maxTicksLimit: 10
            },
        },
        x3:{
            labels : data[2],
            ticks: {
                maxTicksLimit: 10
            },
        },

        y: {
            
            title:{
                display:true,
                text: "°C",
            }
        },
        },
        plugins: {

            tooltip: {

                mode: 'index',

                intersect: false

            },
            legend:{
                position:"bottom",
            }
        }
    },

    });
}



function relhChart(data){
    const ctx = document.getElementById('relhChart');
    
    new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
        label: 'Relative Humidity(%)',
        data: data[1],
        borderWidth: 1.5,
        pointRadius: 0,
        
        }
        ]

    },
    options: {
        responsive:true,
        scales: {
        x: {
            labels: data[3],
            display: false,
            ticks: {
                maxTicksLimit: 10
            },
        },
        x2: {
            labels: data[0],
            ticks: {
                maxTicksLimit: 10
            },
        },
        x3:{
            labels : data[2],
            ticks: {
                maxTicksLimit: 10
            },
        },

        y: {
            max: 100,
            title:{
                display:true,
                text: "%",
            }
        },
        },
        plugins: {

            tooltip: {

                mode: 'index',

                intersect: false

            },
            legend:{
                position:"bottom",
            }
        }
    },

    });
}


function skntChart(data){
    const ctx = document.getElementById('skntChart');
    
    new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
        label: 'Wind Speed(knots)',
        data: data[1],
        borderWidth: 1.5,
        pointRadius: 0,
        }
        ]

    },
    options: {
        responsive:true,
        scales: {
        x: {
            labels: data[3],
            display: false,
            ticks: {
                maxTicksLimit: 10
            },
        },
        x2: {
            labels: data[0],
            ticks: {
                maxTicksLimit: 10
            },
        },
        x3:{
            labels : data[2],
            ticks: {
                maxTicksLimit: 10
            },
        },

        y: {
            title:{
                display:true,
                text: "Knots",
            }
        },
        },
        plugins: {

            tooltip: {

                mode: 'index',

                intersect: false

            },
            legend:{
                position:"bottom",
            }
        }
    },

    });
}

function vsbyChart(data){
    const ctx = document.getElementById('vsbyChart');
    
    new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
        label: 'Visibility(km)',
        data: data[1].map(row=> row*1.60934),
        borderWidth: 1.5,
        pointRadius: 0,
        }
        ]

    },
    options: {
        responsive:true,
        scales: {
        x: {
            labels: data[3],
            display: false,
            ticks: {
                maxTicksLimit: 10
            },
        },
        x2: {
            labels: data[0],
            ticks: {
                maxTicksLimit: 10
            },
        },
        x3:{
            labels : data[2],
            ticks: {
                maxTicksLimit: 10
            },
        },

        y: {
            title:{
                display:true,
                text: "km",
            }
        },
        },
        plugins: {

            tooltip: {

                mode: 'index',
                intersect: false

            },
            legend:{
                position:"bottom",
            }
        }
    },

    });
}


function skyl2Chart(data){
    const ctx = document.getElementById('skyl2Chart');
    console.log(data);
    new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
        label: 'Cloud Height(ft)',
        data: data[1],
        borderWidth: 1.5,
        pointRadius: 0,
        }
        ]

    },
    options: {
        responsive:true,
        scales: {
        x: {
            labels: data[3],
            display: false,
            ticks: {
                maxTicksLimit: 10
            },
        },
        x2: {
            labels: data[0],
            ticks: {
                maxTicksLimit: 10
            },
        },
        x3:{
            labels : data[2],
            ticks: {
                maxTicksLimit: 10
            },
        },

        y: {
            max: 12000,
            title:{
                display:true,
                text: "Feet",
            }
        },
        },
        plugins: {

            tooltip: {

                mode: 'index',
                intersect: false

            },
            legend:{
                position:"bottom",
            }
        }
    },

    });
}