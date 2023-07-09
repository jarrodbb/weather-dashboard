
// function init() {
//     //when loads want empty form
//     getApi()
// }
// init()

// add to local storage
// error handling if incorrect city
// clear text input 
// convert to degrees 
// add icons to temp, wind and humidity


var weatherIcon = document.getElementById('test')
var fiveDayForecastEl = $('.fiveDayForecast')
var currentDayForecastDisplayEl = $('.currentForecastDisplayed')
var weatherSearchFormEL = $('#search-weather') //check if still being used
var displayListOfCitiesEL = $('#multiple-cities')
var fiveDayForecastContainerEl = $('#forecastContainer')
var localStorageList = $('#local-storage')
var clearStorageEL = $('#clear-storage')

var currentDayTempInputs = []
var currentDayTemp = ""
var dayOneTempInputs = []
var dayOneTemp = ""
var dayTwoTempInputs = []
var dayTwoTemp = ""
var dayThreeTempInputs = []
var dayThreeTemp = ""
var dayFourTempInputs = []
var dayFourTemp = ""
var dayFiveTempInputs = []
var dayFiveTemp = ""

var currentDayWindInputs = []
var currentDayWind = ""
var dayOneWindInputs = []
var dayOneWind = ""
var dayTwoWindInputs = []
var dayTwoWind = ""
var dayThreeWindInputs = []
var dayThreeWind = ""
var dayFourWindInputs = []
var dayFourWind = ""
var dayFiveWindInputs = []
var dayFiveWind = ""

var currentDayHumidityInputs = []
var currentDayHumidity = ""
var dayOneHumidityInputs = []
var dayOneHumidity = ""
var dayTwoHumidityInputs = []
var dayTwoHumidity = ""
var dayThreeHumidityInputs = []
var dayThreeHumidity = ""
var dayFourHumidityInputs = []
var dayFourHumidity = ""
var dayFiveHumidityInputs = []
var dayFiveHumidity = ""

var listOfWeatherIcons = []


function saveWeatherSearch(test, cityName) {
    var forecastList = JSON.parse(localStorage.getItem("Forecast"))
        console.log(forecastList)
        if (forecastList == null){
            forecastList = []
        }
        
        var index = forecastList.findIndex(x => x.city==cityName)
        index === -1 ? forecastList.push(test) : console.log("object already exists")
   
        localStorage.setItem("Forecast", JSON.stringify(forecastList));
      
    }
    




weatherSearchFormEL.on('submit', getCityName);

function getCityName(event) {
    // after click want empty form 
    event.preventDefault();

    var searchInputVal = document.querySelector('#cityInput').value; 

    
    if (searchInputVal) {
        clearForecast()
        getCityLocation(searchInputVal)
        searchInputVal.textContent = '';
        
    } else  {   
        window.alert("try again")
        return;
        
        
    }
    
}




function clearForecast(){
    
    

    currentDayTempInputs = []
    currentDayTemp = ""
    dayOneTempInputs = []
    dayOneTemp = ""
    dayTwoTempInputs = []
    dayTwoTemp = ""
    dayThreeTempInputs = []
    dayThreeTemp = ""
    dayFourTempInputs = []
    dayFourTemp = ""
    dayFiveTempInputs = []
    dayFiveTemp = ""

    currentDayWindInputs = []
    currentDayWind = ""
    dayOneWindInputs = []
    dayOneWind = ""
    dayTwoWindInputs = []
    dayTwoWind = ""
    dayThreeWindInputs = []
    dayThreeWind = ""
    dayFourWindInputs = []
    dayFourWind = ""
    dayFiveWindInputs = []
    dayFiveWind = ""

    currentDayHumidityInputs = []
    currentDayHumidity = ""
    dayOneHumidityInputs = []
    dayOneHumidity = ""
    dayTwoHumidityInputs = []
    dayTwoHumidity = ""
    dayThreeHumidityInputs = []
    dayThreeHumidity = ""
    dayFourHumidityInputs = []
    dayFourHumidity = ""
    dayFiveHumidityInputs = []
    dayFiveHumidity = ""

    listOfWeatherIcons = []

    displayListOfCitiesEL.empty();
    currentDayForecastDisplayEl.empty()
    fiveDayForecastEl.empty();

}

function emptyAllArrays() {
    fiveDayForecastEl.empty();
    currentDayForecastDisplayEl.empty()

    currentDayTempInputs = []
    currentDayTemp = ""
    dayOneTempInputs = []
    dayOneTemp = ""
    dayTwoTempInputs = []
    dayTwoTemp = ""
    dayThreeTempInputs = []
    dayThreeTemp = ""
    dayFourTempInputs = []
    dayFourTemp = ""
    dayFiveTempInputs = []
    dayFiveTemp = ""

    currentDayWindInputs = []
    currentDayWind = ""
    dayOneWindInputs = []
    dayOneWind = ""
    dayTwoWindInputs = []
    dayTwoWind = ""
    dayThreeWindInputs = []
    dayThreeWind = ""
    dayFourWindInputs = []
    dayFourWind = ""
    dayFiveWindInputs = []
    dayFiveWind = ""

    currentDayHumidityInputs = []
    currentDayHumidity = ""
    dayOneHumidityInputs = []
    dayOneHumidity = ""
    dayTwoHumidityInputs = []
    dayTwoHumidity = ""
    dayThreeHumidityInputs = []
    dayThreeHumidity = ""
    dayFourHumidityInputs = []
    dayFourHumidity = ""
    dayFiveHumidityInputs = []
    dayFiveHumidity = ""

    listOfWeatherIcons = []


} 

function getCityLocation(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=5&appid=e57c88ac4ae3a64d821b0e6104559bfd';

    fetch(requestUrl) 
    .then(function (response) {
        if (!response.ok) {
            return
          }

          
        return response.json();
    })
    .then(function (city) {
     

        console.log(city[0].country)
        var cityName = city
        var singleCityLat = city[0].lat
        var singleCityLon = city[0].lon
       
        if (city.length > 1) {
            

            var listOfOptions = document.createElement('ul')
            displayListOfCitiesEL.append(listOfOptions)

            for (var i = 0; i < city.length; i++) {
            console.log(cityName[i])
            // var cityNameSelection = cityName[i].name
            console.log(city.length)
            
            var listOfCities = document.createElement('li')
            listOfCities.innerHTML = cityName[i].name + " " + cityName[i].country + " " + "Lattitude: " + cityName[i].lat + " " + "Longtitude: " + cityName[i].lon
            var buttonSelection = document.createElement('button')
            buttonSelection.classList.add('btn', 'btn-primary')
            buttonSelection.setAttribute('type', 'button')
    
            buttonSelection.textContent = " select"


            listOfCities.append(buttonSelection)
            listOfOptions.append(listOfCities)
            
        } 


        } else {
            getApi(singleCityLat, singleCityLon)
        } 
       
    })

    .catch(function(error) {
        //add modal
        window.alert('Error Fetching City');
        //clear text box
        return;
      });
}

displayListOfCitiesEL.on('click', '.btn', run)


function run(event) {
    emptyAllArrays()
    

    var btnClicked = $(event.target)
    var btnData = $(this).closest('li')
    
    console.log(btnClicked)
    console.log(btnData)
    var btnDataList = btnData[0].innerText
    console.log(btnDataList)
    var cityNameInfo = btnDataList.split('Lattitude')
    console.log(cityNameInfo)
    var cityNamePop = cityNameInfo.pop()
    console.log(cityNamePop)
    console.log(cityNameInfo)
    cityNameInfo.toString()
    console.log(cityNameInfo)

    var cityLocationArray = btnDataList.split(':')
    console.log(cityLocationArray)
    var cityDatExtract = cityLocationArray[1].split(' ')
    var cityLonExtract = cityLocationArray[2].split('select')
    console.log(cityLonExtract)
    var cityLon = cityLonExtract[0].trim()
    console.log(cityLon)

    var cityLocationLat = cityDatExtract[1]
    
    console.log(cityLocationLat, cityLon)

    getApi(cityLocationLat, cityLon)

    // var weatherInfo = [cityNameInfo.toString(), cityLocationLat, cityLon]

     var weatherInfo = {
        city: cityNameInfo.toString(),
        Lattidue: cityLocationLat,
        Lon: cityLon,
    };
    
    clearStorageEL.empty()
    $('#local-storage').empty()
    saveWeatherSearch(weatherInfo, weatherInfo.city)
    getPreviousCitySlection ()
    
    
}
 // add local storage for first loading page ********
//clear local storage



function getPreviousCitySlection (){
        let listOfPreviousSearches =  JSON.parse(localStorage.getItem("Forecast"))
        console.log(listOfPreviousSearches)

     
        // var localStorageContainer = document.createElement('div')
        var listEL = document.createElement('ul')
        localStorageList.append(listEL)
        
       

    for (i =0; i <listOfPreviousSearches.length; i++) {

        var buttonSelectionLocalStorage = document.createElement('button')
        buttonSelectionLocalStorage.classList.add('btn', 'btn-primary')
        buttonSelectionLocalStorage.setAttribute('type', 'button')
    
        buttonSelectionLocalStorage.textContent = listOfPreviousSearches[i].city + " " + listOfPreviousSearches[i].Lattidue + " " + listOfPreviousSearches[i].Lon
        
        listEL.append(buttonSelectionLocalStorage)

    
        
    }
    
    var clearLocalStorage = document.createElement('button')
    clearLocalStorage.classList.add('btn', 'btn-primary', 'clear-contents')
    clearLocalStorage.setAttribute('type', 'button')

    clearLocalStorage.textContent = "Clear"

    clearStorageEL.append(clearLocalStorage)


}

clearStorageEL.on('click', '.btn', clearLocalStorageDisplay)

function clearLocalStorageDisplay() {
    localStorage.removeItem("Forecast")
    localStorageList.empty()
    clearStorageEL.empty()


}


localStorageList.on('click', '.btn', rerunCityLocalStorage)

function rerunCityLocalStorage(event) {

    // if($(event.target))
    
    var btnClickedLocalStorage = $(event.target)
    console.log(btnClickedLocalStorage.innerHTML)

   
   
    var btnClickedContents = btnClickedLocalStorage[0].innerHTML
    var btnClickedArray = btnClickedContents.split(' ')
    console.log(btnClickedArray)
    
    cityLatLocalStorageList = btnClickedArray[btnClickedArray.length - 2]
    cityLonLocalStorageList = btnClickedArray[btnClickedArray.length - 1]
    console.log(cityLatLocalStorageList)
    console.log(cityLonLocalStorageList)
   
    //clear list 
    displayListOfCitiesEL.empty()
    emptyAllArrays()
    getApi(cityLatLocalStorageList, cityLonLocalStorageList)
    

}




function average(array) {
    return array.reduce((x,y) => x+y)/array.length
}


function getApi(cityLocationLat, cityLocationLon) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLocationLat + '&lon=' + cityLocationLon + '&appid=e57c88ac4ae3a64d821b0e6104559bfd&units=metric';


    fetch(requestUrl) 
        .then(function (respone) {
            if (!respone.ok) {
                return
              }
            return respone.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data.list[2]);
            console.log(data.list.length)
            var dataLength = data.list
            var currentDate = dayjs(data.list[0].dt_txt)
            console.log(currentDate)

            var todaysForecast = currentDate.format('DD')
            console.log(todaysForecast)

            var dayOneForecast = currentDate.add(1, 'day')
            console.log(dayOneForecast)

            var dayOne = dayjs(dayOneForecast.$d.$d).format('DD')
            console.log(dayOneForecast)

            var dayTwoForecast = currentDate.add(2, 'day')
            var dayTwo = dayjs(dayTwoForecast.$d.$d).format('DD')

            var dayThreeForecast = currentDate.add(3, 'day')
            var dayThree = dayjs(dayThreeForecast.$d.$d).format('DD')

            var dayFourForecast = currentDate.add(4, 'day')
            var dayFour = dayjs(dayFourForecast.$d.$d).format('DD')

            var dayFiveForecast = currentDate.add(5, 'day')
            var dayFive = dayjs(dayFiveForecast.$d.$d).format('DD')


            // if dt_txt(dayjs) is == 12 then 
            for (var i = 0; i < dataLength.length; i++) {
                // renderTime(dataLength[i].dt_txt);
                
                var dailyDate = dayjs(dataLength[i].dt_txt).format('DD')
                console.log(dailyDate)

                if (dailyDate == todaysForecast) {
                    currentDayTempInputs.push(dataLength[i].main.temp)
                    currentDayWindInputs.push(dataLength[i].wind.speed)
                    currentDayHumidityInputs.push(dataLength[i].main.humidity)

                    var currentDayOne = dayjs(dataLength[i].dt_txt).format('HH')
                    if (currentDayOne == '12') {
                        console.log(dataLength[i].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    }
                }

                if (dailyDate == dayOne) {
                    dayOneTempInputs.push(dataLength[i].main.temp)
                    dayOneWindInputs.push(dataLength[i].wind.speed)
                    dayOneHumidityInputs.push(dataLength[i].main.humidity)

                    var middayDayOne = dayjs(dataLength[i].dt_txt).format('HH')
                    if (middayDayOne == '12') {
                        console.log(dataLength[i].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    }

                }
                if (dailyDate == dayTwo) {
                    dayTwoTempInputs.push(dataLength[i].main.temp)
                    dayTwoWindInputs.push(dataLength[i].wind.speed)
                    dayTwoHumidityInputs.push(dataLength[i].main.humidity)

                    var middayDayOne = dayjs(dataLength[i].dt_txt).format('HH')
                    if (middayDayOne == '12') {
                        console.log(dataLength[i].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    }
                }
                if (dailyDate == dayThree) {
                    dayThreeTempInputs.push(dataLength[i].main.temp)
                    dayThreeWindInputs.push(dataLength[i].wind.speed)
                    dayThreeHumidityInputs.push(dataLength[i].main.humidity)

                    var middayDayOne = dayjs(dataLength[i].dt_txt).format('HH')
                    if (middayDayOne == '12') {
                        console.log(dataLength[i].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    }
                }
                if (dailyDate == dayFour) {
                    dayFourTempInputs.push(dataLength[i].main.temp)
                    dayFourWindInputs.push(dataLength[i].wind.speed)
                    dayFourHumidityInputs.push(dataLength[i].main.humidity)

                    var middayDayOne = dayjs(dataLength[i].dt_txt).format('HH')
                    if (middayDayOne == '12') {
                        console.log(dataLength[i].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    }
                }
                if (dailyDate == dayFive) {
                    dayFiveTempInputs.push(dataLength[i].main.temp)
                    dayFiveWindInputs.push(dataLength[i].wind.speed)
                    dayFiveHumidityInputs.push(dataLength[i].main.humidity)

                    var middayDayOne = dayjs(dataLength[i].dt_txt).format('HH')
                    if (middayDayOne == '12') {
                        console.log(dataLength[i].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    } else { 
                        console.log(dataLength[39].weather[0].icon)
                        listOfWeatherIcons.push(dataLength[i].weather[0].icon)
                    }
                }
                console.log(listOfWeatherIcons)
            }

            currentDayTemp += (average(currentDayTempInputs)).toFixed(2)
            dayOneTemp += (average(dayOneTempInputs)).toFixed(2)
            dayTwoTemp += (average(dayTwoTempInputs)).toFixed(2)
            dayThreeTemp += (average(dayThreeTempInputs)).toFixed(2)
            dayFourTemp += (average(dayFourTempInputs)).toFixed(2)
            dayFiveTemp += (average(dayFiveTempInputs)).toFixed(2)

            currentDayWind += (average(currentDayWindInputs)).toFixed(2)
            dayOneWind += (average(dayOneWindInputs)).toFixed(2)
            dayTwoWind += (average(dayTwoWindInputs)).toFixed(2)
            dayThreeWind += (average(dayThreeWindInputs)).toFixed(2)
            dayFourWind += (average(dayFourWindInputs)).toFixed(2)
            dayFiveWind += (average(dayFiveWindInputs)).toFixed(2)

            currentDayHumidity += (average(currentDayHumidityInputs)).toFixed(2)
            dayOneHumidity += (average(dayTwoHumidityInputs)).toFixed(2)
            dayTwoHumidity += (average(dayTwoHumidityInputs)).toFixed(2)
            dayThreeHumidity += (average(dayThreeHumidityInputs)).toFixed(2)
            dayFourHumidity += (average(dayFourHumidityInputs)).toFixed(2)
            dayFiveHumidity += (average(dayFiveHumidityInputs)).toFixed(2)
    
            
            console.log(dayOneTemp, dayOneWind, dayOneHumidity)
            console.log(dayTwoTemp, dayTwoTemp, dayTwoHumidity)
            console.log(dayThreeTemp, dayThreeTemp, dayThreeHumidity)
            console.log(dayFourTemp, dayFourWind, dayFourHumidity)
            console.log(dayFiveTemp, dayFiveWind, dayFiveHumidity)

            renderCurrentDayForecast(currentDate, listOfWeatherIcons[0], currentDayTemp, currentDayWind, currentDayHumidity)
            renderForecast(dayOneForecast, listOfWeatherIcons[1], dayOneTemp, dayOneWind, dayOneHumidity)
            renderForecast(dayTwoForecast, listOfWeatherIcons[2], dayTwoTemp, dayTwoWind, dayTwoHumidity)
            renderForecast(dayThreeForecast, listOfWeatherIcons[3], dayThreeTemp, dayThreeWind, dayThreeHumidity)
            renderForecast(dayFourForecast, listOfWeatherIcons[4], dayFourTemp, dayFourWind, dayFourHumidity)
            renderForecast(dayFiveForecast, listOfWeatherIcons[5], dayFiveTemp, dayFiveWind, dayFiveHumidity)
            
        })
}

console.log(dayOneTempInputs)

console.log(dayOneTemp)
// 'mb-3', 'p-3', 'col-12', 'col-md-8', 'col-lg-9'

function renderForecast(date, icon, temp, wind, humidity) {
    // fiveDayForecastContainerEl.innerHTML = ''

    var forecastCard = document.createElement('div')
    forecastCard.classList.add('card', 'bg-light', 'flex-row', 'text-dark', 'mb-3', 'p-3', 'col-12',  'col-lg-2');

    var forecastBody = document.createElement('div')
    forecastBody.classList.add('card-body')
    forecastCard.append(forecastBody)

    var forecastTitle = document.createElement('h3')
    forecastTitle.classList.add()
    forecastTitle.textContent = dayjs(date.$d.$d).format('dd DD MMM YY')

    var weatherIconEL = document.createElement('img')
    weatherIconEL.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '@2x.png' )

    var bodyTempContentEl = document.createElement('p')
    bodyTempContentEl.innerHTML = '<strong>Avg. Temp:</strong> ' + temp + '<br/>';

    var bodyWindContentEl = document.createElement('p')
    bodyWindContentEl.innerHTML = '<strong>Avg. Wind:</strong> ' + wind + '<br/>';

    var bodyHumidityContentEl = document.createElement('p')
    bodyHumidityContentEl.innerHTML = '<strong>Avg. Humidity:</strong> ' + humidity + '<br/>';

    forecastBody.append(forecastTitle, weatherIconEL, bodyTempContentEl, bodyWindContentEl, bodyHumidityContentEl)

    fiveDayForecastEl.append(forecastCard)


}

function renderCurrentDayForecast(date, icon, temp, wind, humidity) {
    var currentDayForecastCard = document.createElement('div')
    currentDayForecastCard.classList.add('card', 'bg-light', 'flex-row', 'text-dark', 'mb-3', 'p-3', 'col-12',  'col-lg-2');

    var currentDayForecastBody = document.createElement('div')
    currentDayForecastBody.classList.add('card-body')
    currentDayForecastCard.append(currentDayForecastBody)

    var currentDayForecastTitle = document.createElement('h2')
    currentDayForecastTitle.classList.add()
    currentDayForecastTitle.textContent = dayjs(date.$d.$d).format('dd DD MMM YY')

    var currentDayWeatherIconEL = document.createElement('img')
    currentDayWeatherIconEL.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '@2x.png' )

    var currentDayBodyTempContentEl = document.createElement('p')
    currentDayBodyTempContentEl.innerHTML = '<strong>Avg. Temp:</strong> ' + temp + '<br/>';

    var currentBodyWindContentEl = document.createElement('p')
    currentBodyWindContentEl.innerHTML = '<strong>Avg. Wind:</strong> ' + wind + '<br/>';

    var currentBodyHumidityContentEl = document.createElement('p')
    currentBodyHumidityContentEl.innerHTML = '<strong>Avg. Humidity:</strong> ' + humidity + '<br/>';

    currentDayForecastBody.append(currentDayForecastTitle, currentDayWeatherIconEL, currentDayBodyTempContentEl, currentBodyWindContentEl, currentBodyHumidityContentEl)

    currentDayForecastDisplayEl.append(currentDayForecastCard)

}


