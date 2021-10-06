var APIkey = "8ca77be93b8c15ee7b97c2c78186ba1507778311"
var requestURL = "https://calendarific.com/api/v2/countries?&api_key=" + APIkey
var countryList = {}
var countyCodes = {}
const BTN_STYLE = "waves-effect waves-light btn-large";

// Adding Event Handlers
$("#add-country-form").on("submit", handleAddCountry);
$("#add-country-btn").click(handleAddCountry);
$("#countries-list").click(handleDeleteCountry);
$("#submit-button").click(handleSubmitBtn);

onLoad();

function onLoad() {
    getAPI();
    renderCountriesList();
}

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

            localStorage.setItem("countryList", JSON.stringify(countryList));
            localStorage.setItem("countryCodes", JSON.stringify(countyCodes));
        })
}

function handleSubmitBtn() {
    document.location.replace("./calendar.html");
}

// Method that handles the button click, or submit event for 
// when a user adds a new country to the list of countries
function handleAddCountry(e) {
    e.preventDefault();
    var countryName = $("#countryI").val();

    // Getting local storage
    var countries = JSON.parse(localStorage.getItem("countries"));
    if(countries === null) {
        countries = [];
    }

    // Making sure input isn't a duplicate
    if(!countries.includes(countryName) && countries.length < 3 && countryName in countryList) {
        countries.push(countryName);
        localStorage.setItem("countries", JSON.stringify(countries));
        renderCountriesList();
    } 

    // Clear search bar
    $("#countryI").val(""); 
}

// Method that deletes a country from the list of countries a user has chosen
function handleDeleteCountry(e) {
    var countryName = e.target.textContent;
    
    // Getting local storage, and removing from local storage
    var countries = JSON.parse(localStorage.getItem("countries"));
    if(countries !== null) {
        for(let i = 0; i < countries.length; i++) {
            if(countries[i].toLowerCase() === countryName.toLowerCase()) {
                countries.splice(i, 1);
                localStorage.setItem("countries", JSON.stringify(countries));
                break;
            }
        }

        // re-rendering countries list
        renderCountriesList();
    }
}

function renderCountriesList() {
    var list = document.getElementById("countries-list");

    // Before render, remove all children first
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

    var countries = JSON.parse(localStorage.getItem("countries"));

    // Create the new li elements
    if(countries !== null) {
        for(let i = 0; i < countries.length; i++) {
            var newLi = $("<li>").html(countries[i]);
            $(newLi).addClass(BTN_STYLE).addClass("add-btn");
            $("#countries-list").prepend(newLi);
        }
    }
}

$(document).ready(function(){
    $('input.autocomplete').autocomplete({
      data: countryList,
      limit: 5,
    });
  });