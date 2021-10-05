var APIkey = "8ca77be93b8c15ee7b97c2c78186ba1507778311"
var requestURL = "https://calendarific.com/api/v2/countries?&api_key=" + APIkey
var countryList = {}
var countyCodes = {}

getAPI()

function getAPI() {
    fetch(requestURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.response.countries.length; i++) {
                countryList[data.response.countries[i].country_name] = null
                countyCodes[data.response.countries[i].country_name] = data.response.countries[i]["iso-3166"]
            }
        })
}

$(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: countryList,
      limit: 5,
    });
  });