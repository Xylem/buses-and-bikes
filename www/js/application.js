var chart;

function redraw() {
    d3.select('#chart svg')
        .datum(chartData())
        .call(chart);
}

nv.addGraph(function() {
    chart = nv.models.lineChart()
        .options({
            showXAxis: true,
            showYAxis: true,
            transitionDuration: 250,
            height: 900
        });

    chart.xAxis.axisLabel("Time");

    chart.yAxis.axisLabel('Population');

    d3.select('#chart svg')
        .datum(chartData())
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

var towns = {};

function chartData() {
    return Object.keys(towns).map(function (key) {
        return {
            values: towns[key],
            key: key
        };
    });
}

var socket = io.connect();

socket.on("status", function (data) {
    data.forEach(function (element) {
        if (!towns.hasOwnProperty(element.town.name)) {
            towns[element.town.name] = [];
        }

        towns[element.town.name].push({
            x: element.time,
            y: element.town.availablePopulation
        })
    });

    redraw();
});
socket.on("stats", function (data) {
    if (!towns.hasOwnProperty(data.town.name)) {
        towns[data.town.name] = [];
    }

    towns[data.town.name].push({
        x: data.time,
        y: data.town.availablePopulation
    });

    redraw();
});