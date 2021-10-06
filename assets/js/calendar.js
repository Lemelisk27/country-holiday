var APIkey = "5e61c0ce804e0035eb140605ede33a2083a7df59"
var countries = JSON.parse(localStorage.getItem("countries"));
var countryCodes = JSON.parse(localStorage.getItem("countryCodes"))
var backBtn = $('#backBtn')
var color = ['#36528a', '#e36d6b', '#5fcb76', '#9567bf']
// var color = ['blue', 'yellow', 'arctic blue', 'kayak blue']
var legends = $('#legends')

// Main
var calendar = createCalendar()
addHolidaysByCountry(countries)

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
