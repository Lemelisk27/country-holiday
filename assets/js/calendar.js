<<<<<<< HEAD
google.charts.load('current', {'packages':['corechart']});

// var APIkey = "8ca77be93b8c15ee7b97c2c78186ba1507778311"
=======
>>>>>>> dev
var APIkey = "5e61c0ce804e0035eb140605ede33a2083a7df59"
var countries = JSON.parse(localStorage.getItem("countries"));
var countryCodes = JSON.parse(localStorage.getItem("countryCodes"))
var backBtn = $('#backBtn')
var color = ['#36528a', '#e36d6b', '#5fcb76', '#9567bf']
// var color = ['blue', 'yellow', 'arctic blue', 'kayak blue']
var legends = $('#legends')
var countryID = []

// Main
var calendar = createCalendar()
addHolidaysByCountry(countries)
getData()

// Event listener for back button
backBtn.on('click', function () {
    console.log('click');
    document.location.replace('./index.html');
})

// function that creates calendar
function createCalendar(holidaysArray = []) {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth',
        },
        fistDay: 1,
        // aspectRatio: 2, //1.3 default
        // height: '100%',
        events: holidaysArray,
        // eventExample: [{
        //     groupId: '999',
        //     title: 'China Holiday',
        //     start: '2021-10-05',
        //     end: '2021-10-05'
        // }]
    })
    calendar.render()
    return calendar
}

async function getHolidaysAPI(Url, newColor = 'blue') {
    const response = await fetch(Url);
    const data = await response.json();
<<<<<<< HEAD
    // console.log(data)
=======
>>>>>>> dev
    for (let i = 0; i < data.response.holidays.length; i++) {
        if (data.response.holidays[i].type.includes("National holiday")) {
            var newHoliday = {
                title: data.response.holidays[i].name,
                start: data.response.holidays[i].date.iso,
                 color: newColor,     // an option!
                 textColor: 'white' // an option!
            }
            calendar.addEvent(newHoliday)
        }
    }
}

function addHolidaysByCountry(countries){
    for (let i = 0; i < countries.length; i++) {
        var actualCountryCode = countryCodes[countries[i]]
        var newUrl = 'https://calendarific.com/api/v2/holidays?&api_key=' + APIkey + '&country=' + actualCountryCode + '&year=2021'
        getHolidaysAPI(newUrl, color[i])
        var newLegend = $('<li>');
        newLegend.text(countries[i]);
        newLegend.attr('style', 'background-color: ' + color[i] + '; border-radius: 3px; color: white; padding: 9px; margin: 0 3px; position:relative; bottom: 13px')
        legends.append(newLegend)
    }
}

for (let i = 0; i < countries.length; i++) {
    countryID.push(countryCodes[countries[i]])    
}

function getData() {
    var requestNewURL = "https://covid-api.mmediagroup.fr/v1/cases?country="
    fetch(requestNewURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        var testArray = []
        var dataArray = []
        for (let i = 0; i < Object.keys(data).length; i++) {
            testArray.push(Object.keys(data)[i]) 
        }
        for (let i = 0; i < testArray.length; i++) {
            if (countryID.includes(data[testArray[i]].All.abbreviation)) {
                var countryData = {
                    countryName: "",
                    population: "",
                    confirmed: "",
                    deaths: "",
                }
                countryData.countryName = data[testArray[i]].All.country
                countryData.confirmed = data[testArray[i]].All.confirmed
                countryData.deaths = data[testArray[i]].All.deaths
                countryData.population = data[testArray[i]].All.population - countryData.confirmed - countryData.deaths
                dataArray.push(countryData)
            }
        }
        if (dataArray.length === 1) {
            google.charts.setOnLoadCallback(firstChart);
        }
        if (dataArray.length === 2) {
            google.charts.setOnLoadCallback(firstChart);
            google.charts.setOnLoadCallback(secondChart);
        }
        if (dataArray.length === 3) {
            google.charts.setOnLoadCallback(firstChart);
            google.charts.setOnLoadCallback(secondChart);
            google.charts.setOnLoadCallback(thirdChart);
        }
        function firstChart() {

            var data = google.visualization.arrayToDataTable([
              ['Label', 'Numbers'],
              ['Comfirmed Cases: ' + dataArray[0].confirmed.toLocaleString('en-US'),dataArray[0].confirmed],
              ['Deaths: ' + dataArray[0].deaths.toLocaleString('en-US'),dataArray[0].deaths],
              ['Population: ' + dataArray[0].population.toLocaleString('en-US'),dataArray[0].population],
            ]);
    
            var options = {
              title: "Covid-19 Status for " + dataArray[0].countryName,
              pieStartAngle: 90,
              slices: 
                {2: {offset: 0.2,
                color: "green",
                },},
              legend: {
                position: "left",
                alignment: "start",
                maxLines: 3,
                textStyle: {
                    color: "white",
                }
              },
              titleTextStyle: {
                  color: "white",
              },
              pieSliceText: "percentage",
              sliceVisibilityThreshold: .0,
              backgroundColor: "transparent",
            };
    
            var chart = new google.visualization.PieChart(document.getElementById('fristChart'));
    
            chart.draw(data, options);
        }
        function secondChart() {

            var data = google.visualization.arrayToDataTable([
              ['Label', 'Numbers'],
              ['Comfirmed Cases: ' + dataArray[1].confirmed.toLocaleString('en-US'),dataArray[1].confirmed],
              ['Deaths: ' + dataArray[1].deaths.toLocaleString('en-US'),dataArray[1].deaths],
              ['Population: ' + dataArray[1].population.toLocaleString('en-US'),dataArray[1].population],
            ]);
    
            var options = {
                title: "Covid-19 Status for " + dataArray[1].countryName,
                pieStartAngle: 90,
                slices: 
                {2: {offset: 0.2,
                color: "red",
                },},
                legend: {
                  position: "left",
                  alignment: "start",
                  maxLines: 3,
                  textStyle: {
                      color: "white",
                  }
                },
                titleTextStyle: {
                    color: "white",
                },
                pieSliceText: "percentage",
                sliceVisibilityThreshold: .0,
                backgroundColor: "transparent",
              };
    
            var chart = new google.visualization.PieChart(document.getElementById('secondChart'));
    
            chart.draw(data, options);
        }
        function thirdChart() {

            var data = google.visualization.arrayToDataTable([
              ['Label', 'Numbers'],
              ['Comfirmed Cases: ' + dataArray[2].confirmed.toLocaleString('en-US'),dataArray[2].confirmed],
              ['Deaths: ' + dataArray[2].deaths.toLocaleString('en-US'),dataArray[2].deaths],
              ['Population: ' + dataArray[2].population.toLocaleString('en-US'),dataArray[2].population],
            ]);
    
            var options = {
                title: "Covid-19 Status for " + dataArray[2].countryName,
                pieStartAngle: 90,
                slices: 
                {2: {offset: 0.2,
                color: "blue",
                },},
                legend: {
                  position: "left",
                  alignment: "start",
                  maxLines: 3,
                  textStyle: {
                      color: "white",
                  }
                },
                titleTextStyle: {
                    color: "white",
                },
                pieSliceText: "percentage",
                sliceVisibilityThreshold: .0,
                backgroundColor: "transparent",
              };
    
            var chart = new google.visualization.PieChart(document.getElementById('thirdChart'));
    
            chart.draw(data, options);
        }
    })
}