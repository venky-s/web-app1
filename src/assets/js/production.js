$(window).on('load', function (event) {

    var overview_persistency = $("#overview-persistency");

    var options = {
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                label: function (t, d) {
                    if (t.datasetIndex === 0) {
                        return '2018 : ' + t.yLabel.toFixed(2) + '%';
                    } else if (t.datasetIndex === 1) {
                        if (t.yLabel.toString().length === 9) {
                            return '2019 : ' + Math.round(+t.yLabel.toString().replace(/(\d{3})(.*)/, '$1.$2')) + '%';
                        } else return '2019 : ' + Math.round(+t.yLabel.toString().replace(/(\d{2})(.*)/, '$1.$2')) + '%';
                    }
                },
            },
            backgroundColor: '#000',
            xPadding: 30,
            yPadding: 10,
            bodyFontColor: '#fff',
            titleFontColor: '#fff',
            caretSize: 0

        },
        showLines: true,
        legend: {
            display: true,
            position: 'bottom',
            padding: 20
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{


            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    suggestedMin: 50,
                    suggestedMax: 100
                }
            }]
        }
    };

    var afyp_chart = new Chart(overview_persistency, {

        curvature: 0.3,
        data: {
            datasets: [

                {
                    label: '1st year persistency',
                    type: 'line',
                    data: [40, 20, 30, 40, 40, 20, 30, 40, 70, 20, 30, 40],
                    backgroundColor: "transparent",
                    borderColor: "#e9e4e4",
                    pointRadius: 0,
                    lineTension: 0
                },
                {
                    label: '2nd year persistency',
                    type: 'line',
                    data: [140, 120, 130, 140, 140, 120, 130, 140, 170, 120, 130, 140],
                    backgroundColor: "transparent",
                    borderColor: "#e9e4e4",
                    pointRadius: 0,
                    lineTension: 0
                },

                {
                    label: 'CE',
                    data: [10, 80, 50, 70, null, null, null, null, null, null, null, null],
                    backgroundColor: "transparent",
                    type: 'line',
                    pointRadius: 0,
                    lineTension: 0,
                    borderColor: "#f3c10f",
                },
              



            ],
            labels: ["Jan", "Feb", "Mac", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        options: options
    });


})