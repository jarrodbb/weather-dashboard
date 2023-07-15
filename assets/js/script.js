// Variables for linking to HTML
var fiveDayForecastEl = $(".fiveDayForecast");
var currentDayForecastDisplayEl = $(".currentForecastDisplayed");
var weatherSearchFormEL = $("#search-weather");
var displayListOfCitiesEL = $("#multiple-cities");
var fiveDayForecastContainerEl = $("#forecastContainer");
var localStorageList = $("#local-storage");
var clearStorageEL = $("#clear-storage");
var renderWeatherLocation = $(".weather-section");

// Modal to open when the page loads.
const myModal = new bootstrap.Modal("#myModal");
// event listener for when page loads
window.addEventListener("DOMContentLoaded", () => {
  myModal.show();
});

//Function to load when at the start
function init() {
  getPreviousCitySlection();
}
init();

//Empty variables for manipulating data from API
var currentDayTempInputs = [];
var currentDayTemp = "";
var dayOneTempInputs = [];
var dayOneTemp = "";
var dayTwoTempInputs = [];
var dayTwoTemp = "";
var dayThreeTempInputs = [];
var dayThreeTemp = "";
var dayFourTempInputs = [];
var dayFourTemp = "";
var dayFiveTempInputs = [];
var dayFiveTemp = "";

var currentDayWindInputs = [];
var currentDayWind = "";
var dayOneWindInputs = [];
var dayOneWind = "";
var dayTwoWindInputs = [];
var dayTwoWind = "";
var dayThreeWindInputs = [];
var dayThreeWind = "";
var dayFourWindInputs = [];
var dayFourWind = "";
var dayFiveWindInputs = [];
var dayFiveWind = "";

var currentDayHumidityInputs = [];
var currentDayHumidity = "";
var dayOneHumidityInputs = [];
var dayOneHumidity = "";
var dayTwoHumidityInputs = [];
var dayTwoHumidity = "";
var dayThreeHumidityInputs = [];
var dayThreeHumidity = "";
var dayFourHumidityInputs = [];
var dayFourHumidity = "";
var dayFiveHumidityInputs = [];
var dayFiveHumidity = "";

var listOfWeatherIcons = [];

//Function for saving to local storage
function saveWeatherSearch(weatherInfo, cityName) {
  var forecastList = JSON.parse(localStorage.getItem("Forecast"));
  console.log(forecastList);
  if (forecastList == null) {
    forecastList = [];
  }
  var index = forecastList.findIndex((x) => x.city == cityName);
  index === -1
    ? forecastList.push(weatherInfo)
    : console.log("object already exists"); //If the city is already in local storage a copy will not be saved
  localStorage.setItem("Forecast", JSON.stringify(forecastList));
}

//When form is submitted, function is run to get the city name
weatherSearchFormEL.on("submit", getCityName);

function getCityName(event) {
  // after click want empty form
  event.preventDefault();

  var searchInputVal = document.querySelector("#cityInput").value; //city name from input

  if (searchInputVal) {
    //run clearing function to clear site
    clearForecast();
    //Run function to fetch city's Latitude and Longtitude of the city from search
    getCityLocation(searchInputVal);
    //clear search input
    document.querySelector("#cityInput").value = "";
  } else {
    //If search input is empty. Clear page and add h1 with error notice informing the user "City input required. Try again"
    clearForecast();
    var inputCityRequired = document.createElement("h1");
    inputCityRequired = "City input required. Try again";
    currentDayForecastDisplayEl.removeClass();
    currentDayForecastDisplayEl.addClass("city-input-error");
    currentDayForecastDisplayEl.append(inputCityRequired);
    //Return to stop executing code
    return;
  }
}

//Clear function to clear webpage and arrays
function clearForecast() {
  currentDayTempInputs = [];
  currentDayTemp = "";
  dayOneTempInputs = [];
  dayOneTemp = "";
  dayTwoTempInputs = [];
  dayTwoTemp = "";
  dayThreeTempInputs = [];
  dayThreeTemp = "";
  dayFourTempInputs = [];
  dayFourTemp = "";
  dayFiveTempInputs = [];
  dayFiveTemp = "";

  currentDayWindInputs = [];
  currentDayWind = "";
  dayOneWindInputs = [];
  dayOneWind = "";
  dayTwoWindInputs = [];
  dayTwoWind = "";
  dayThreeWindInputs = [];
  dayThreeWind = "";
  dayFourWindInputs = [];
  dayFourWind = "";
  dayFiveWindInputs = [];
  dayFiveWind = "";

  currentDayHumidityInputs = [];
  currentDayHumidity = "";
  dayOneHumidityInputs = [];
  dayOneHumidity = "";
  dayTwoHumidityInputs = [];
  dayTwoHumidity = "";
  dayThreeHumidityInputs = [];
  dayThreeHumidity = "";
  dayFourHumidityInputs = [];
  dayFourHumidity = "";
  dayFiveHumidityInputs = [];
  dayFiveHumidity = "";

  listOfWeatherIcons = [];

  displayListOfCitiesEL.empty();
  currentDayForecastDisplayEl.empty();
  fiveDayForecastEl.empty();
}

//Different clear function to run depending on the which function is being run
function emptyAllArrays() {
  fiveDayForecastEl.empty();
  currentDayForecastDisplayEl.empty();

  currentDayTempInputs = [];
  currentDayTemp = "";
  dayOneTempInputs = [];
  dayOneTemp = "";
  dayTwoTempInputs = [];
  dayTwoTemp = "";
  dayThreeTempInputs = [];
  dayThreeTemp = "";
  dayFourTempInputs = [];
  dayFourTemp = "";
  dayFiveTempInputs = [];
  dayFiveTemp = "";

  currentDayWindInputs = [];
  currentDayWind = "";
  dayOneWindInputs = [];
  dayOneWind = "";
  dayTwoWindInputs = [];
  dayTwoWind = "";
  dayThreeWindInputs = [];
  dayThreeWind = "";
  dayFourWindInputs = [];
  dayFourWind = "";
  dayFiveWindInputs = [];
  dayFiveWind = "";

  currentDayHumidityInputs = [];
  currentDayHumidity = "";
  dayOneHumidityInputs = [];
  dayOneHumidity = "";
  dayTwoHumidityInputs = [];
  dayTwoHumidity = "";
  dayThreeHumidityInputs = [];
  dayThreeHumidity = "";
  dayFourHumidityInputs = [];
  dayFourHumidity = "";
  dayFiveHumidityInputs = [];
  dayFiveHumidity = "";

  listOfWeatherIcons = [];
}
const weatherKey = "0fa6cf67c95ce9cfddf96f4f78835497";

//Function to fetch API to get the city's latitude and longtitude
function getCityLocation(location) {
  //URL to use input from search
  var requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    "&limit=5&appid=" +
    weatherKey;
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        return;
      }
      return response.json();
    })
    .then(function (city) {
      var cityName = city;
      var singleCityLat = city[0].lat;
      var singleCityLon = city[0].lon;

      //If multiple citys are returned, a list is displayed to confirm your selection. For e.g there are multiple londons
      if (city.length > 1) {
        console.log(city);

        var listOfOptions = document.createElement("ul");

        var titleListSelction = document.createElement("h1");
        titleListSelction.textContent =
          "Which " + location + " were you after ?";

        displayListOfCitiesEL.append(titleListSelction, listOfOptions);

        for (var i = 0; i < city.length; i++) {
          //li created and appended
          var listOfCities = document.createElement("li");
          listOfCities.innerHTML =
            cityName[i].name +
            " " +
            cityName[i].country +
            " " +
            "Lattitude: " +
            cityName[i].lat +
            " " +
            "Longtitude: " +
            cityName[i].lon;
          var buttonSelection = document.createElement("button");
          // Button added for the user to confirm the correct option
          buttonSelection.classList.add("btn", "btn-primary");
          buttonSelection.setAttribute("type", "button");
          buttonSelection.textContent = " select";

          listOfCities.append(buttonSelection);
          listOfOptions.append(listOfCities);
        }
      } else {
        //If only one city is returned. Run the API to get forecast
        getApi(singleCityLat, singleCityLon);
      }
    })

    .catch(function (error) {
      //catch error
      //Clear webpage
      clearForecast();
      //If error. Add h2 with messgae "cannot find city"
      var inputCityRequired = $(
        '<h2>Cannot find that city. Try again </h2> <i class="fas fa-exclamation-circle fa-lg"></i>'
      );
      //Remove classes for formatting
      currentDayForecastDisplayEl.removeClass();
      currentDayForecastDisplayEl.addClass("city-input-error");
      currentDayForecastDisplayEl.append(inputCityRequired);
      return;
    });
}

//Run a function when the button is clicked
displayListOfCitiesEL.on("click", ".btn", run);

function run(event) {
  //Run clear function
  emptyAllArrays();
  //Get the Lattitude and Longtitude for the city selected.
  var btnClicked = $(event.target);
  var btnData = $(this).closest("li");

  console.log(btnClicked);
  console.log(btnData);
  var btnDataList = btnData[0].innerText;
  console.log(btnDataList);
  var cityNameInfo = btnDataList.split("Lattitude");
  console.log(cityNameInfo);
  var cityNamePop = cityNameInfo.pop();
  console.log(cityNamePop);
  console.log(cityNameInfo);
  cityNameInfo.toString();
  console.log(cityNameInfo);
  //Lattitude and Longtitude is split and assigned to seperated variables
  var cityLocationArray = btnDataList.split(":");
  console.log(cityLocationArray);
  var cityDatExtract = cityLocationArray[1].split(" ");
  var cityLonExtract = cityLocationArray[2].split("select");
  console.log(cityLonExtract);
  var cityLon = cityLonExtract[0].trim();
  console.log(cityLon);

  var cityLocationLat = cityDatExtract[1];

  console.log(cityLocationLat, cityLon);

  //Forecast function is run with the selected Lattitude and Longtitude to fetch the API
  getApi(cityLocationLat, cityLon);

  //Object created to save to local storage
  var weatherInfo = {
    city: cityNameInfo.toString(),
    Lattidue: cityLocationLat,
    Lon: cityLon,
  };

  clearStorageEL.empty();
  //Clear list displaying local storage
  $("#local-storage").empty();
  //save to local storage
  saveWeatherSearch(weatherInfo, weatherInfo.city);
  getPreviousCitySlection();
  displayListOfCitiesEL.empty();
}

//Get data from local storage
function getPreviousCitySlection() {
  let listOfPreviousSearches = JSON.parse(localStorage.getItem("Forecast"));
  //If nothing in storasge, return
  if (!listOfPreviousSearches) {
    return;
  } else {
    //Create ul for button to be appended to
    var listEL = document.createElement("ul");
    //format styling for ul
    listEL.classList.add("list-styling");
    localStorageList.append(listEL);

    for (i = 0; i < listOfPreviousSearches.length; i++) {
      //button for each city in local storage
      var buttonSelectionLocalStorage = document.createElement("button");
      buttonSelectionLocalStorage.classList.add(
        "btn",
        "btn-secondary",
        "search-button"
      ); //bootstrap styling
      buttonSelectionLocalStorage.setAttribute("type", "button");
      //button content
      buttonSelectionLocalStorage.textContent =
        listOfPreviousSearches[i].city +
        " " +
        listOfPreviousSearches[i].Lattidue +
        " " +
        listOfPreviousSearches[i].Lon;
      //append button
      listEL.append(buttonSelectionLocalStorage);
    }

    //add clear button
    var clearLocalStorage = document.createElement("button");
    clearLocalStorage.classList.add("btn", "btn-secondary", "clear-contents");
    clearLocalStorage.setAttribute("type", "button");
    clearLocalStorage.textContent = "Clear";
    clearStorageEL.append(clearLocalStorage);
  }
}

//select clear button. Run function to clear list
clearStorageEL.on("click", ".btn", clearLocalStorageDisplay);

//function to clear list. Empties local storage
function clearLocalStorageDisplay() {
  localStorage.removeItem("Forecast");
  localStorageList.empty();
  clearStorageEL.empty();
}

//listener on button displayed from local storage
localStorageList.on("click", ".btn", rerunCityLocalStorage);

//function to handle click
function rerunCityLocalStorage(event) {
  // get the latitude and longtitude from the selected button
  var btnClickedLocalStorage = $(event.target);
  console.log(btnClickedLocalStorage.innerHTML);

  var btnClickedContents = btnClickedLocalStorage[0].innerHTML;
  var btnClickedArray = btnClickedContents.split(" ");
  console.log(btnClickedArray);

  cityLatLocalStorageList = btnClickedArray[btnClickedArray.length - 2];
  cityLonLocalStorageList = btnClickedArray[btnClickedArray.length - 1];

  //clear any lists of potential cities if displayed
  displayListOfCitiesEL.empty();
  //run clear function
  emptyAllArrays();
  //run forecast function with latitude and longtitude from button
  getApi(cityLatLocalStorageList, cityLonLocalStorageList);
}

//function to get average.
function average(array) {
  return array.reduce((x, y) => x + y) / array.length;
}

//Forecast function to fetch API with latitude and longtitude
function getApi(cityLocationLat, cityLocationLon) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    cityLocationLat +
    "&lon=" +
    cityLocationLon +
    "&appid=" +
    weatherKey +
    "&units=metric";

  fetch(requestUrl)
    .then(function (respone) {
      if (!respone.ok) {
        return; // return if not ok response
      }
      return respone.json();
    })
    .then(function (data) {
      // Using DOM to get the first position of data array. This first position is classed as the current day.
      //The forecast data is retuned for every 3hours. Each returned forecast array is checked and assigned to the same day.
      // Current day data is defined first with the first position.
      // Day 1 (current) - day 5 is assigned to a variable
      // Averages of the min and max for each returned hour for a given day is calculated
      //dayjs is used to format the date
      var dataLength = data.list;
      var currentDate = dayjs(data.list[0].dt_txt);
      console.log(currentDate);

      var todaysForecast = currentDate.format("DD");
      console.log(todaysForecast);

      var dayOneForecast = currentDate.add(1, "day");
      console.log(dayOneForecast);

      var dayOne = dayjs(dayOneForecast.$d.$d).format("DD");
      console.log(dayOneForecast);

      var dayTwoForecast = currentDate.add(2, "day");
      var dayTwo = dayjs(dayTwoForecast.$d.$d).format("DD");

      var dayThreeForecast = currentDate.add(3, "day");
      var dayThree = dayjs(dayThreeForecast.$d.$d).format("DD");

      var dayFourForecast = currentDate.add(4, "day");
      var dayFour = dayjs(dayFourForecast.$d.$d).format("DD");

      var dayFiveForecast = currentDate.add(5, "day");
      var dayFive = dayjs(dayFiveForecast.$d.$d).format("DD");

      //Loop over returned data to confirm the day of forecast.
      //Temp, wind and humidity is pushed to the relevant array for each day
      for (var i = 0; i < dataLength.length; i++) {
        var dailyDate = dayjs(dataLength[i].dt_txt).format("DD");
        console.log(dailyDate);

        if (dailyDate == todaysForecast) {
          currentDayTempInputs.push(dataLength[i].main.temp);
          currentDayWindInputs.push(dataLength[i].wind.speed);
          currentDayHumidityInputs.push(dataLength[i].main.humidity);

          var currentDayOne = dayjs(dataLength[i].dt_txt).format("HH"); // format date to get weather icon.
          if (currentDayOne == "12") {
            console.log(dataLength[i].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon); //push to array containing icons
          }
        }

        if (dailyDate == dayOne) {
          dayOneTempInputs.push(dataLength[i].main.temp);
          dayOneWindInputs.push(dataLength[i].wind.speed);
          dayOneHumidityInputs.push(dataLength[i].main.humidity);

          var middayDayOne = dayjs(dataLength[i].dt_txt).format("HH");
          if (middayDayOne == "12") {
            console.log(dataLength[i].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon);
          }
        }
        if (dailyDate == dayTwo) {
          dayTwoTempInputs.push(dataLength[i].main.temp);
          dayTwoWindInputs.push(dataLength[i].wind.speed);
          dayTwoHumidityInputs.push(dataLength[i].main.humidity);

          var middayDayOne = dayjs(dataLength[i].dt_txt).format("HH");
          if (middayDayOne == "12") {
            console.log(dataLength[i].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon);
          }
        }
        if (dailyDate == dayThree) {
          dayThreeTempInputs.push(dataLength[i].main.temp);
          dayThreeWindInputs.push(dataLength[i].wind.speed);
          dayThreeHumidityInputs.push(dataLength[i].main.humidity);

          var middayDayOne = dayjs(dataLength[i].dt_txt).format("HH");
          if (middayDayOne == "12") {
            console.log(dataLength[i].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon);
          }
        }
        if (dailyDate == dayFour) {
          dayFourTempInputs.push(dataLength[i].main.temp);
          dayFourWindInputs.push(dataLength[i].wind.speed);
          dayFourHumidityInputs.push(dataLength[i].main.humidity);

          var middayDayOne = dayjs(dataLength[i].dt_txt).format("HH");
          if (middayDayOne == "12") {
            console.log(dataLength[i].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon);
          }
        }
        if (dailyDate == dayFive) {
          dayFiveTempInputs.push(dataLength[i].main.temp);
          dayFiveWindInputs.push(dataLength[i].wind.speed);
          dayFiveHumidityInputs.push(dataLength[i].main.humidity);

          var middayDayOne = dayjs(dataLength[i].dt_txt).format("HH");
          if (middayDayOne == "12") {
            console.log(dataLength[i].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon);
          } else {
            console.log(dataLength[39].weather[0].icon);
            listOfWeatherIcons.push(dataLength[i].weather[0].icon);
          }
        }
        console.log(listOfWeatherIcons);
      }
      //variable created of city's name to render
      var nameOfSelection = data.city.name;

      //variables created with average from arrays
      currentDayTemp += average(currentDayTempInputs).toFixed(2);
      dayOneTemp += average(dayOneTempInputs).toFixed(2);
      dayTwoTemp += average(dayTwoTempInputs).toFixed(2);
      dayThreeTemp += average(dayThreeTempInputs).toFixed(2);
      dayFourTemp += average(dayFourTempInputs).toFixed(2);
      dayFiveTemp += average(dayFiveTempInputs).toFixed(2);

      //variables created with average from arrays
      currentDayWind += average(currentDayWindInputs).toFixed(2);
      dayOneWind += average(dayOneWindInputs).toFixed(2);
      dayTwoWind += average(dayTwoWindInputs).toFixed(2);
      dayThreeWind += average(dayThreeWindInputs).toFixed(2);
      dayFourWind += average(dayFourWindInputs).toFixed(2);
      dayFiveWind += average(dayFiveWindInputs).toFixed(2);

      //variables created with average from arrays
      currentDayHumidity += average(currentDayHumidityInputs).toFixed(2);
      dayOneHumidity += average(dayTwoHumidityInputs).toFixed(2);
      dayTwoHumidity += average(dayTwoHumidityInputs).toFixed(2);
      dayThreeHumidity += average(dayThreeHumidityInputs).toFixed(2);
      dayFourHumidity += average(dayFourHumidityInputs).toFixed(2);
      dayFiveHumidity += average(dayFiveHumidityInputs).toFixed(2);

      //console log to check
      console.log(dayOneTemp, dayOneWind, dayOneHumidity);
      console.log(dayTwoTemp, dayTwoTemp, dayTwoHumidity);
      console.log(dayThreeTemp, dayThreeTemp, dayThreeHumidity);
      console.log(dayFourTemp, dayFourWind, dayFourHumidity);
      console.log(dayFiveTemp, dayFiveWind, dayFiveHumidity);

      //title of 5day forcast
      var fiveDayTitle = document.createElement("h4");
      fiveDayTitle.innerHTML = "<strong>5-Day Forecast:</strong>";
      fiveDayForecastEl.append(fiveDayTitle);

      //Run functions to render current day and forecast
      renderCurrentDayForecast(
        currentDate,
        nameOfSelection,
        listOfWeatherIcons[0],
        currentDayTemp,
        currentDayWind,
        currentDayHumidity
      );
      renderForecast(
        dayOneForecast,
        listOfWeatherIcons[1],
        dayOneTemp,
        dayOneWind,
        dayOneHumidity
      );
      renderForecast(
        dayTwoForecast,
        listOfWeatherIcons[2],
        dayTwoTemp,
        dayTwoWind,
        dayTwoHumidity
      );
      renderForecast(
        dayThreeForecast,
        listOfWeatherIcons[3],
        dayThreeTemp,
        dayThreeWind,
        dayThreeHumidity
      );
      renderForecast(
        dayFourForecast,
        listOfWeatherIcons[4],
        dayFourTemp,
        dayFourWind,
        dayFourHumidity
      );
      renderForecast(
        dayFiveForecast,
        listOfWeatherIcons[5],
        dayFiveTemp,
        dayFiveWind,
        dayFiveHumidity
      );
    });
}

//Function to render forecast
function renderForecast(date, icon, temp, wind, humidity) {
  //div created for cards
  var forecastCard = document.createElement("div");
  //bootstrap formatting for cards. Columns used for sizing
  forecastCard.classList.add(
    "card",
    "bg-secondary",
    "text-dark",
    "mb-3",
    "col-12",
    "col-lg-2",
    "card-body-format",
    "forecast-display-cards"
  );

  //div created for card body
  var forecastBody = document.createElement("div");
  forecastBody.classList.add("card-body", "row");
  forecastCard.append(forecastBody);

  //h6 created to display date
  var forecastTitle = document.createElement("h6");
  forecastTitle.classList.add("col-12", "col-med-12", "col-lg-12"); //bootstrap formatting. Columns used for sizing
  forecastTitle.textContent = dayjs(date.$d.$d).format("dd DD MMM YY"); //date formatted with dayjs

  //img created for weather icon
  var weatherIconEL = document.createElement("img");
  weatherIconEL.classList.add("col-3", "col-med-6", "col-lg-6"); //bootstrap formatting. Columns used for sizing
  weatherIconEL.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  );

  //p created for displaying the temp
  var bodyTempContentEl = document.createElement("p");
  bodyTempContentEl.innerHTML =
    "<strong>Avg. Temp:</strong> " + temp + "°C" + "<br/>";
  bodyTempContentEl.classList.add(
    "forecast-font",
    "col-12",
    "col-med-12",
    "col-lg-12"
  ); //bootstrap formatting. Columns used for sizing

  //p created for displaying the wind
  var bodyWindContentEl = document.createElement("p");
  bodyWindContentEl.classList.add(
    "forecast-font",
    "col-12",
    "col-med-12",
    "col-lg-12"
  ); //bootstrap formatting. Columns used for sizing
  bodyWindContentEl.innerHTML =
    "<strong>Avg. Wind:</strong> " + wind + " m/s" + "<br/>";

  //p created for displaying the humidity
  var bodyHumidityContentEl = document.createElement("p");
  bodyHumidityContentEl.classList.add(
    "forecast-font",
    "col-12",
    "col-med-12",
    "col-lg-12"
  ); //bootstrap formatting. Columns used for sizing
  bodyHumidityContentEl.innerHTML =
    "<strong>Avg. Humidity:</strong> " + humidity + "%" + "<br/>";

  //append forecast to card body
  forecastBody.append(
    forecastTitle,
    weatherIconEL,
    bodyTempContentEl,
    bodyWindContentEl,
    bodyHumidityContentEl
  );

  //append card body
  fiveDayForecastEl.append(forecastCard);
}

//function to render the current day's forecast
function renderCurrentDayForecast(date, name, icon, temp, wind, humidity) {
  //remove classes. Added incase any classes from the error notices are still present
  currentDayForecastDisplayEl.removeClass();

  //div added
  var currentDayForecastCard = document.createElement("div");
  currentDayForecastCard.classList.add(
    "flex-row",
    "card",
    "bg-light",
    "text-dark",
    "mb-3",
    "p-3"
  ); //bootstrap formatting. Columns used for sizing

  //div added
  var currentDayForecastBody = document.createElement("div");
  currentDayForecastBody.classList.add("card-body"); //styling added
  currentDayForecastCard.append(currentDayForecastBody); //append element

  //div created
  var forecastCurrentDayDiv = document.createElement("div");
  forecastCurrentDayDiv.classList.add("col-12", "flex-row"); //bootstrap formatting. Columns used for sizing

  //h1 created for date
  var currentDayForecastTitle = document.createElement("h1");
  currentDayForecastTitle.classList.add("col-6"); //bootstrap formatting. Columns used for sizing
  currentDayForecastTitle.textContent = dayjs(date.$d.$d).format(
    "dd DD MMM YY"
  ); //date formatted with dayjs

  //h5 created for city name
  var locationOfWeatherReading = document.createElement("h5");
  locationOfWeatherReading.classList.add("col-6"); //bootstrap formatting. Columns used for sizing
  locationOfWeatherReading.textContent = name;

  forecastCurrentDayDiv.append(
    currentDayForecastTitle,
    locationOfWeatherReading
  ); //apend

  //img created for weather icon
  var currentDayWeatherIconEL = document.createElement("img");
  currentDayWeatherIconEL.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" + icon + "@2x.png"
  );

  //h4 created for temp
  var currentDayBodyTempContentEl = document.createElement("h4");
  currentDayBodyTempContentEl.innerHTML =
    "<strong>Avg. Temp:</strong> " + temp + "°C" + "<br/>";

  //h4 created for wind
  var currentBodyWindContentEl = document.createElement("h4");
  currentBodyWindContentEl.innerHTML =
    "<strong>Avg. Wind:</strong> " + wind + " m/s" + "<br/>";

  //h4 created for humidity
  var currentBodyHumidityContentEl = document.createElement("h4");
  currentBodyHumidityContentEl.innerHTML =
    "<strong>Avg. Humidity:</strong> " + humidity + "%" + "<br/>";

  //append to forecast body
  currentDayForecastBody.append(
    forecastCurrentDayDiv,
    currentDayWeatherIconEL,
    currentDayBodyTempContentEl,
    currentBodyWindContentEl,
    currentBodyHumidityContentEl
  );
  //apend
  currentDayForecastDisplayEl.append(currentDayForecastCard);
}
