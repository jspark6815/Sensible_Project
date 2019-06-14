var date = ['6/5', '6/6', '6/7', '6/8', '6/9', '6/10', '6/11', '6/12', '6/13', '6/14'];
function radomizedData(min, max) {
    return Math.round(Math.random() * (max + 1 - min) + min);
}
var config = {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: '습도 센서',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: false,
        }, {
            label: '온도 센서',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Arduino DHT Sensor'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};
var config2 = {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: '사운드 센서',
            backgroundColor: window.chartColors.green,
            borderColor: window.chartColors.green,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            fill: true,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Arduino Sound Sensor'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};
var config3 = {
    type: 'line',
    data: {
        labels: date,
        datasets: [{
            label: '수위 센서',
            backgroundColor: window.chartColors.yellow,
            borderColor: window.chartColors.yellow,
            data: [
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100),
                radomizedData(0, 100)
            ],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Arduino Liquid Levels Switch'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};
window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
    var ctx = document.getElementById('canvas2').getContext('2d');
    window.myLine2 = new Chart(ctx, config2);
    var ctx = document.getElementById('canvas3').getContext('2d');
    window.myLine3 = new Chart(ctx, config3);
    var ctx = document.getElementById('canvas4').getContext('2d');
    window.myLine4 = new Chart(ctx, config);
    var ctx = document.getElementById('canvas5').getContext('2d');
    window.myLine5 = new Chart(ctx, config2);
};
// document.getElementById('addData').addEventListener('click', function() {
//     if (config.data.datasets.length > 0) {
//         var month = date[config.data.labels.length % date.length];
//         config2.data.labels.push(month);

//         config.data.datasets.forEach(function(dataset) {
//             dataset.data.push(randomScalingFactor());
//         });

//         window.myLine.update();
//     }
// });