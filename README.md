# weather-dashboard

Weather dashboard with 5 day forecast

## Description

The weather dashboard allows the user to input any city into the search bar and obtain the current days weather along with the 5-Day forecast. The returned weather information includes in metric

1. Temperature
2. Wind Speed
3. Humidity
4. Weather icon

Two APIs from Openweather API were used to create this site.

1. The first API is the geocoding API to obtain the city's Latitude and Longitude to be used in the second API's URL
2. The second API is the 5-Day forecast API to return the weather data for the specific city of interest

The returned data for the 5-Day forecast returns data for a every 3 hour step this gives 40 weather data inputs. It was decided that for any given day an average of the temperature, weather and humidity would be used to display the weather.

#### Data returned from weather API

#### Using DOM traversing and taking data for a given time period an average is returned

## Installation

[weather-dashboard] (https://github.com/jarrodbb/weather-dashboard)

[Deployed-link] (https://jarrodbb.github.io/weather-dashboard/)

HTML
[index.html] (https://github.com/jarrodbb/weather-dashboard/blob/main/index.html)

JavaScript
[script.js] (https://github.com/jarrodbb/weather-dashboard/tree/main/assets/js)

CSS
[style.css] (https://github.com/jarrodbb/weather-dashboard/blob/main/assets/css/style.css)

## Usage

#### Modal is displayed when the page loads informing the user that the information displayed on the site are averages

#### User inputs city name

#### The first API (geocoding API) returns multiple cities with the same name. The user is required to confirm their selection. Note, if only only city has a specific name, this step is skipped

#### The Weather is rendered with the current day's forecast taking the majority of the space on the site. Below the current days forecast is the 5-Day forecast

#### The city and its details are saved to local storage and rendered on the page too. If the city is already in local storage, it is not added twice

#### Bootstrap columns and media queries are used for different sized screens

### Error catching

#### A city name is required. If no city is inputted an error message is rendered informing the user "City input required. Try again"

#### If there is an error with the city name or the city doesn't exist an error message is rendered informing the user "Cannot find the city. Try again!"

## Licence

Please refer to the licence in the repo.
