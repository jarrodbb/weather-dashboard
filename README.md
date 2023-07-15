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
![Screenshot 2023-07-15 at 1 39 38 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/9b6d1aca-e337-41ba-9661-cce5321af457)

#### Using DOM traversing and taking data for a given time period an average is returned
![Screenshot 2023-07-15 at 1 39 52 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/85669718-01f0-40bc-8415-bbfa9eb98b5e)

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
![Screenshot 2023-07-15 at 1 44 55 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/87007fa4-3e8c-478c-8094-a8e5e5e99a6d)

#### User inputs city name
![Screenshot 2023-07-15 at 1 45 09 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/c2b15c5f-80c5-4867-8bdc-0f34e7755ece)

#### The first API (geocoding API) returns multiple cities with the same name. The user is required to confirm their selection. Note, if only only city has a specific name, this step is skipped
![Screenshot 2023-07-15 at 1 45 28 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/c4a364dd-0168-4f99-b3c2-9968f9a793f6)

#### The Weather is rendered with the current day's forecast taking the majority of the space on the site. Below the current days forecast is the 5-Day forecast
![Screenshot 2023-07-15 at 1 45 40 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/d6ce9a64-3d66-4f94-ae3b-fa244cef6afa)

#### The city and its details are saved to local storage and rendered on the page too. If the city is already in local storage, it is not added twice
![Screenshot 2023-07-15 at 1 45 58 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/f209b76e-3d46-4902-b05c-8a2094d0d638)

#### Bootstrap columns and media queries are used for different sized screens
![Screenshot 2023-07-15 at 1 46 28 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/829502b7-d267-4220-97e5-61d02a33b4a1)
![Screenshot 2023-07-15 at 1 46 37 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/c70b3a27-8b06-4c15-b185-20a8f0afd620)
![Screenshot 2023-07-15 at 1 46 46 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/f123adce-9916-4cc5-9aff-d4c9b118ab74)

### Error catching

#### A city name is required. If no city is inputted an error message is rendered informing the user "City input required. Try again"
![Screenshot 2023-07-15 at 1 47 16 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/1c05fe6c-7072-41d4-8c6b-7f279b268221)

#### If there is an error with the city name or the city doesn't exist an error message is rendered informing the user "Cannot find the city. Try again!"
![Screenshot 2023-07-15 at 1 47 26 pm](https://github.com/jarrodbb/weather-dashboard/assets/132813348/2bf24c6d-90ce-4327-a5d6-f03337383321)

## Licence

Please refer to the licence in the repo.
