var APIkey = "8ca77be93b8c15ee7b97c2c78186ba1507778311"
var requestHolidaysURL = 'https://calendarific.com/api/v2/holidays?&api_key=' + APIkey + '&country=US&year=2021';
var holidaysList = [];
var resultAPI;
var countries = JSON.parse(localStorage.getItem("countries"));
var countryCodes = JSON.parse(localStorage.getItem("countryCodes"))
var backBtn = $('#backBtn')
var color = ['blue', 'red', 'green', 'orange']

var events = [{
    groupId: '999',
    title: 'China Holiday',
    start: '2021-10-04',
    end: '2021-10-04'
},
{
    groupId: '998',
    title: 'USA Holiday',
    start: '2021-10-04',
    end: '2021-10-04'
}]

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
            right: 'dayGridMonth,listWeek',
        },
        aspectRatio: 2, //1.3 default
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

async function getHolidaysAPI(Url, newColor = 'white') {
    var holidaysList = []
    const response = await fetch(Url);
    const data = await response.json();
    console.log(data)
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
    return holidaysList
}

function addHolidaysByCountry(countries){
    for (let i = 0; i < countries.length; i++) {
        var actualCountryCode = countryCodes[countries[i]]
        // console.log(actualCountryCode)
        var newUrl = 'https://calendarific.com/api/v2/holidays?&api_key=' + APIkey + '&country=' + actualCountryCode + '&year=2021'
        console.log(newUrl)
        getHolidaysAPI(newUrl, color[i])
    }
}
