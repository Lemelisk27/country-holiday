var APIkey = "8ca77be93b8c15ee7b97c2c78186ba1507778311"
var requestHolidaysURL = 'https://calendarific.com/api/v2/holidays?&api_key=' + APIkey + '&country=US&year=2021';
var holidaysList = [];
var resultAPI;

var backBtn = $('#backBtn')

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
getHolidaysAPI()

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

async function getHolidaysAPI() {

    var holidaysList = []
    const response = await fetch(requestHolidaysURL);
    const data = await response.json();
    console.log(data)
    for (let i = 0; i < data.response.holidays.length; i++) {
        var newHoliday = {
            title: data.response.holidays[i].name,
            start: data.response.holidays[i].date.iso
        }
        calendar.addEvent(newHoliday)
        // holidaysList.push(newHoliday)
    }
    return holidaysList

    // function getHolidaysAPI() {
    // fetch(requestHolidaysURL)
    //     .then(response => response.json())
    //     .then(data => {
    //         for (let i = 0; i < data.response.holidays.length; i++) {
    //             var newHoliday = {
    //                 title: data.response.holidays[i].name,
    //                 start: data.response.holidays[i].date.iso
    //             }
    //             holidaysList.push(newHoliday)
    //         }
    //     })
}