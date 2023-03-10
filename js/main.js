// Variable Declartion
var searchCity = document.getElementById('city');
var cityName = document.querySelector('.cityname');
var searchBtn = document.getElementById('btnSearch');
var weatherData = document.querySelector('.weather-data-div');
var cityWeatherData = document.querySelector('.city-weather-data');
var cityDataContainer = document.querySelector('.weather-div-container');
// Current Variable
var currentValue = document.querySelector('.current').querySelector('.current-weather');
var currentWeatherCondition = document.querySelector('.current').querySelector('.weather-condition');
var currentHighTemp = document.querySelector('.current').querySelector('#high-weather').querySelector('.temp-value');
var currentLowTemp = document.querySelector('.current').querySelector('#low-weather').querySelector('.temp-value');

// Tomorrow Variable
var tomorrowValue = document.querySelector('.tomorrow').querySelector('.current-weather');
var tommorowWeatherCondition = document.querySelector('.tomorrow').querySelector('.weather-condition');
var tomorrowHighTemp = document.querySelector('.tomorrow').querySelector('#high-weather').querySelector('.temp-value');
var tomorrowLowTemp = document.querySelector('.tomorrow').querySelector('#low-weather').querySelector('.temp-value');

// Day 3 Varibale
var day3Value = document.querySelector('.day3').querySelector('.current-weather');
var day3WeatherCondition = document.querySelector('.day3').querySelector('.weather-condition');
var day3HighTemp = document.querySelector('.day3').querySelector('#high-weather').querySelector('.temp-value');
var day3LowTemp = document.querySelector('.day3').querySelector('#low-weather').querySelector('.temp-value');
var weatherDate = document.querySelector('.day3').querySelector('.weather-date');
weatherDate.innerHTML = getDayName(getTwoDaysAhead());

// AQI Data
var aqiMeasure = document.querySelector('#measure-no');
var aqiCondiiton = document.querySelector('#measure-condition');
var aqiContaniner = document.querySelector('.aqi-container');

// Forecast Data
var forecastData = document.querySelector('.forecast-data');

// Default Data
var inputValue = 'Noida';
var noOfDays = prompt("Enter No. of Days Between (5-14) for weather forecast: ");
var api_url = 'http://api.weatherapi.com/v1/forecast.json?key=007b91982fa145099db50542230903&q=Haridwar&days=' + noOfDays + '&aqi=yes&alerts=no';


var requestOptions = {
    method: 'GET',
    redirect: 'follow',
};

addEventListener('load', function reloadFirst() {
    alert('Forecast available in Current Weather Info.')
    inputValue = searchCity.value;
    console.log(inputValue);
    getWeather(api_url);
})

searchCity.addEventListener('keypress', function getInputValue(event) {
    if (event.key === "Enter") {
        inputValue = searchCity.value;
        console.log(inputValue);
        if (inputValue !== '' && inputValue !== undefined)
            api_url = 'http://api.weatherapi.com/v1/forecast.json?key=007b91982fa145099db50542230903&q=' + inputValue + '&days=' + noOfDays + '&aqi=yes&alerts=no';
        getWeather(api_url);
    }
})
searchBtn.addEventListener('click', function getInputValue() {
    inputValue = searchCity.value;
    console.log(inputValue);
    if (inputValue !== '' && inputValue !== undefined)
        api_url = 'http://api.weatherapi.com/v1/forecast.json?key=007b91982fa145099db50542230903&q=' + inputValue + '&days=' + noOfDays + '&aqi=yes&alerts=no';
    getWeather(api_url);
})

function getWeather(api_url) {
    console.log(api_url);
    fetch(api_url, requestOptions)
        .then((response) => response.json())
        .then((data) => localStorage.setItem('api_response', JSON.stringify(data)));
    settingWeatherData();
}

function settingWeatherData() {
    var data = JSON.parse(localStorage.getItem('api_response'));
    console.log(data);
    currentWeather(data);
    tomorrowWeather(data);
    day3Weather(data)
    aqiIndex(data.current);
}

function currentWeather(data) {
    console.log('Entering Here');
    var cityDetails = cityName.querySelector('h2').innerText;
    var timezone = data.location.tz_id + '';
    cityDetails = data.location.name + ", " + data.location.region + " As of " + data.location.localtime.split(' ')[1] + " Timezone: (" + timezone.replace('_', ' ') + ")";
    cityName.querySelector('h2').innerText = cityDetails;
    currentValue.innerHTML = data.current.temp_c + "&#176";
    currentWeatherCondition.innerHTML = data['current']['condition'].text;
    let icon = document.createElement('img');
    icon.classList.add('weather-image')
    icon.style.display = 'block';
    icon.setAttribute('src', "https://" + data['current']['condition'].icon.split('//')[1]);
    currentWeatherCondition.appendChild(icon);
    currentHighTemp.innerHTML = data.forecast.forecastday[0]['day'].maxtemp_c + "&#176";
    currentLowTemp.innerHTML = data.forecast.forecastday[0]['day'].mintemp_c + "&#176";
}

function tomorrowWeather(data) {
    var cityDetails = cityName.querySelector('h2').innerText;
    var timezone = data.location.tz_id + '';
    cityDetails = data.location.name + ", " + data.location.region + " As of " + data.location.localtime.split(' ')[1] + " Timezone: (" + timezone.replace('_', ' ') + ")";
    cityName.querySelector('h2').innerText = cityDetails;
    tomorrowValue.innerHTML = data.forecast.forecastday[1]['day'].avgtemp_c + "&#176";
    tommorowWeatherCondition.innerHTML = data.forecast.forecastday[1]['day']['condition'].text;
    let icon = document.createElement('img');
    icon.classList.add('weather-image')
    icon.style.display = 'block';
    icon.setAttribute('src', "https://" + data.forecast.forecastday[1]['day']['condition'].icon.split('//')[1]);
    tommorowWeatherCondition.appendChild(icon);
    tomorrowHighTemp.innerHTML = data.forecast.forecastday[1]['day'].maxtemp_c + "&#176";
    tomorrowLowTemp.innerHTML = data.forecast.forecastday[1]['day'].mintemp_c + "&#176";
}

function day3Weather(data) {
    var cityDetails = cityName.querySelector('h2').innerText;
    var timezone = data.location.tz_id + '';
    weatherDate.innerHTML = getDayName(data.forecast.forecastday[2].date);
    cityDetails = data.location.name + ", " + data.location.region + " As of " + data.location.localtime.split(' ')[1] + " Timezone: (" + timezone.replace('_', ' ') + ")";
    cityName.querySelector('h2').innerText = cityDetails;
    day3Value.innerHTML = data.forecast.forecastday[2]['day'].avgtemp_c + "&#176";
    day3WeatherCondition.innerHTML = data.forecast.forecastday[2]['day']['condition'].text;
    let icon = document.createElement('img');
    icon.classList.add('weather-image')
    icon.style.display = 'block';
    icon.setAttribute('src', "https://" + data.forecast.forecastday[2]['day']['condition'].icon.split('//')[1]);
    day3WeatherCondition.appendChild(icon);
    day3HighTemp.innerHTML = data.forecast.forecastday[2]['day'].maxtemp_c + "&#176";
    day3LowTemp.innerHTML = data.forecast.forecastday[2]['day'].mintemp_c + "&#176";
}

function aqiIndex(data) {
    // Setting AQI Data
    let aqiValue = Math.round(data.air_quality.pm10, 2);
    aqiMeasure.innerHTML = aqiValue;
    console.log(getConditon(aqiValue));
    aqiCondiiton.innerHTML = getConditon(aqiValue).split('|')[0];
    aqiContaniner.style.borderColor = getConditon(aqiValue).split('|')[1];

}

function getDayName(dateStr) {
    var today = new Date(dateStr);
    const options = { weekday: 'long' };
    const dayName = new Intl.DateTimeFormat('en-US', options).format(today);
    return dayName;
}

function getTwoDaysAhead() {
    let today = new Date();
    let twoDaysAhead = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000));
    return twoDaysAhead;
}

function getConditon(aqiValue) {
    var condition = '';
    var color = '';
    console.log(aqiValue);
    if (aqiValue < 50) {
        condition = 'Good';
        color = 'Green';
    }
    else if (aqiValue > 50 && aqiValue < 101) {
        condition = 'Satisfactory';
        color = '#5f971b'
    }
    else if (aqiValue > 100 && aqiValue < 201) {
        condition = 'Moderately Polluted';
        color = '#c40aa3'
    }
    else if (aqiValue > 200 && aqiValue < 301) {
        condition = 'Poor';
        color = '#edd60f'
    }
    else if (aqiValue > 300 && aqiValue < 401) {
        condition = 'Very Poor';
        color = 'Red'
    }
    else if (aqiValue > 400) {
        condition = 'Severe';
        color = '#6e1a37'
    }

    console.log(condition);
    return condition + '|' + color;
}

weatherData.addEventListener('click', function displayForecast(e) {
    console.log(e.target);
    forecast(JSON.parse(localStorage.getItem('api_response')));
});


function forecast(data) {

    if (forecastData.classList.contains('display')) {
        forecastData.classList.remove('display');
        while (forecastData.hasChildNodes()) {
            forecastData.removeChild(forecastData.firstChild);
        }
    } else {
        forecastData.classList.add('display');
        forecastData.style.transition = '0.5s';
        for (let i = 0; i < data.forecast.forecastday.length; i++) {
            let forecastNewDiv = document.createElement('div');
            forecastNewDiv.classList.add('class-data');

            let forecastdayDiv = document.createElement('div');
            forecastdayDiv.classList.add('day-data-div');

            let dayWise = document.createElement('span');
            dayWise.classList.add('day-data');
            dayWise.innerHTML = getDayName(data.forecast.forecastday[i].date) + " (" + data.forecast.forecastday[i].date + "): ";

            // Setting Temp Day Wise
            let forecastTime = document.createElement('span');
            forecastTime.classList.add('forecast-temp-data');
            var temp = data.forecast.forecastday[i].day.avgtemp_c + '&#176';
            forecastTime.innerHTML = temp;

            // Setting Graphics Day Wise
            let forecastImageDiv = document.createElement('div');
            forecastImageDiv.classList.add('img-data');
            let icon = document.createElement('img');
            icon.classList.add('weather-image')
            icon.style.display = 'inline';
            icon.style.width = '50px';
            icon.style.verticalAlign = 'middle';
            icon.setAttribute('src', "https://" + data.forecast.forecastday[i]['day']['condition'].icon.split('//')[1]);

            forecastdayDiv.appendChild(dayWise);
            forecastdayDiv.appendChild(forecastTime);
            forecastImageDiv.appendChild(icon);
            forecastNewDiv.appendChild(forecastdayDiv);
            forecastNewDiv.appendChild(forecastImageDiv);
            forecastData.appendChild(forecastNewDiv);
        }
    }
}