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

backBtn.on('click', function(){
    console.log('click')
})

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
}

function createEvents() {
    // Must return an array of JSON [{},{}...]
    // var arrayOfEvents = []
    // Into the JSON it can have the keys: 
    // groupId: '###' numbers, don't know what it does yet, its optional. don't include by the moment
    // title: 'Title of the holiday'
    // start: 'YYYY-MM-DD'
    // end: 'YYYY-MM-DD', optional, can be another day
    // arrayOfEvents.append(JSON)
    // return arrayOfEvents -> calendar's parameter
}

createCalendar(events)