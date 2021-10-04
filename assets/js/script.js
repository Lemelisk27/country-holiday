function createCalendar(holidaysArray = []) {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listWeek'
        },
        events: holidaysArray,
        // eventExample: [{
        //     groupId: '999',
        //     title: 'China Holiday',
        //     start: '2021-10-05',
        //     end: '2021-10-05'
        // }]
    })
    calendar.render()
}

function createEvents() {
    // Must return an array of JSON [{},{}...]
    // var arrayOfEvents = []
    // Into the JSON it can have the keys: 
    // groupId: '###' numbers, don't know what it does yet, its optional. don't include by the moment
    // title: 'Title of the holiday'
    // start: 'YYYY-MM-DD'
    // end: 'YYYY-MM-DD', optional, can be in another day
    // arrayOfEvents.append(JSON)
    // return arrayOfEvents -> calendar's parameter
}

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

createCalendar(events)