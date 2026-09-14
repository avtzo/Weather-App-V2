const weatherScreen = document.querySelector(".weather-screen");
const errorScreen = document.querySelector(".error-screen");

const searchBoxH1 = document.getElementById("app-name");
const searchBox = document.querySelector(".search-box");
const userInput = document.getElementById("user-input");
const searchBtn = document.getElementById("search-btn");

const cityNameHeader = document.getElementById("city-name");
const currentDate = document.getElementById("current-date");
const cityLocation = document.getElementById("current-location");
const weatherIcon = document.getElementById("weather-icon");
const weatherState = document.getElementById("weather-state");
const currentTemp = document.getElementById("current-temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const uv = document.getElementById("uv");

const forecastContainer = document.querySelector(".forecast-days");

async function getWeatherData(cityName) {
    const apiKey = "" // Your API Key Here
    const cleanCityName = cityName.toLowerCase().trim();
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cleanCityName}&days=3&aqi=no&alerts=no`;
    let data = null;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }

        data = await response.json();

    } catch (error) {
        console.error(error.message);
    }

    return data;
}

function getWeatherState(weatherStateCode) {
    if (weatherStateCode === 1000) return "clear";
    if ([1003, 1006, 1009, 1030, 1135, 1147].includes(weatherStateCode)) return "cloudy";
    if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(weatherStateCode)) return "rainy";
    if ([1066, 1069, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225].includes(weatherStateCode)) return "snowy";
    if ([1087, 1273, 1276, 1279, 1282].includes(weatherStateCode)) return "thunder";
}

async function displayWeather(cityName) {
    userInput.value = "";

    showLoading();

    await new Promise(resolve => setTimeout(resolve, 3000));

    const weatherData = await getWeatherData(cityName);
    hideLoading();

    if (!weatherData) {
        weatherScreen.classList.add("hidden");
        errorScreen.classList.remove("hidden");
        return;
    } else {
        errorScreen.classList.add("hidden");
        weatherScreen.classList.remove("hidden");
    }

    const cityLocationFormat = `${weatherData.location.region}, ${weatherData.location.country}`;
    cityNameHeader.textContent = weatherData.location.name;
    currentDate.textContent = weatherData.forecast.forecastday[0].date;
    cityLocation.textContent = cityLocationFormat;
    weatherIcon.src = weatherData.current.condition.icon;
    weatherIcon.setAttribute("alt", weatherData.current.condition.text);
    weatherState.textContent = weatherData.current.condition.text;
    currentTemp.textContent = `${weatherData.current.temp_c}°C`;
    humidity.textContent = `${weatherData.current.humidity}%`;
    windSpeed.textContent = `${weatherData.current.gust_kph}km/h`;
    uv.textContent = weatherData.current.uv;
    forecastContainer.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        const forecastBox = document.createElement("div");
        forecastBox.classList.add("forecast-box");
        const day = new Date(`${weatherData.forecast.forecastday[i].date}T00:00:00`);
        const dayName = day.toLocaleDateString("en-US", {weekday: "short"});
        forecastBox.innerHTML = 
        `
            <img src="${weatherData.forecast.forecastday[i].day.condition.icon}" alt="${weatherData.forecast.forecastday[i].day.condition.text}">
            <h3>${dayName}</h3>
            <p>${weatherData.forecast.forecastday[i].day.avgtemp_c}°C</p>
        `
        forecastContainer.appendChild(forecastBox);
    }
    console.log(weatherData);

    const bgWeatherState = getWeatherState(weatherData.current.condition.code);   
    
    searchBoxH1.style.display = "none";
    searchBox.style.position = "relative";
    searchBox.style.top = window.matchMedia("(min-width: 769px)").matches ? "-100px" : "0";
    searchBox.style.padding = "0";
    searchBox.style.background = "transparent";
    searchBox.style.backdropFilter = "none";
    searchBox.style.border = "none";

    switch(bgWeatherState) {
        case "thunder": {
            document.body.style.backgroundImage = `url(images/thunder.jpg)`;
            break;
        }
        case "cloudy": {
            document.body.style.backgroundImage = `url(images/cloudy.jpg)`;
            break;
        }
        case "rainy": {
            document.body.style.backgroundImage = `url(images/rainy.jpg)`;
            searchBox.style.backdropFilter = "blur(10px)";
            break;
        }
        case "snowy": {
            document.body.style.backgroundImage = `url(images/snowy.jpg)`;
            break;
        }
        default: {
            document.body.style.backgroundImage = `url(images/sunny.jpg)`;
        }
    }

}

searchBtn.addEventListener("click", () => {
    if (userInput.value.trim() === "") {
        alert("Please Enter a Location");
        errorScreen.classList.add("hidden");
        return;
    }
    displayWeather(userInput.value);
});

userInput.addEventListener("keydown", (e) => {    
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

const skeletonElements = [cityNameHeader, weatherState, currentTemp, weatherIcon, currentDate, cityLocation, humidity, windSpeed, uv];

function showLoading() {
    skeletonElements.forEach(el => el.classList.add("skeleton"));

    forecastContainer.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const skeletonBox = document.createElement("div");
        skeletonBox.classList.add("forecast-box", "skeleton");
        skeletonBox.style.height = "100px";
        forecastContainer.appendChild(skeletonBox);
    }
}

function hideLoading() {
    skeletonElements.forEach(el => el.classList.remove("skeleton"));
}