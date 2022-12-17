geos();
const iconElement = document.querySelector(".icon");
const tempElement = document.querySelector(".temp");
const descElement = document.querySelector(".des");
const aqElement = document.querySelector(".airq");
const winspElement = document.querySelector(".winsp");
const locationElement = document.querySelector(".city1");
const visibleElement = document.querySelector(".vis");
const winddirElement = document.querySelector(".wini");
const uvElement = document.querySelector(".uv");
const notificationElement = document.querySelector(".notification");

const weather = {};

weather.temperature = {
  unit: "celsius",
};

const KELVIN = 273;
console.log(process.env.NODE_ENV);
const key = process.env.NODE_ENV;

function geos() {
  // CHECK IF BROWSER SUPPORTS GEOLOCATION
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    notificationElement.style.display = "block";
    let div = document.createElement("div");
    div.className = "alert alert-danger";
    div.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
    notificationElement.append(div);
  }
}

function setPosition(position) {
  getWeatherDetails(
    [position.coords.latitude, position.coords.longitude],
    "geo-location"
  );
}

function showError(error) {
  // SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
  notificationElement.style.display = "block";
  let div = document.createElement("div");
  div.className = "alert alert-danger";
  div.innerHTML = `<p> ${error.message} - for fetching geo-location.</p>`;
  notificationElement.append(div);
}

function getSearchText() {
  getWeatherDetails(
    [document.getElementById("search-text").value],
    "search-text"
  );
}

function enableLoader(value) {
  if (value) {
    document.querySelector("#g1").style.display = "none";
    document.querySelector("#g2").style.display = "block";
  } else {
    document.querySelector("#g1").style.display = "block";
    document.querySelector("#g2").style.display = "none";
  }
}

async function getWeatherDetails(searchtext, searchType) {
  let api =
    searchType === "search-text"
      ? `https://api.weatherbit.io/v2.0/current?city=${searchtext[0]}&key=${key}`
      : `https://api.weatherbit.io/v2.0/current?lat=${searchtext[0]}&lon=${searchtext[1]}&key=${key}`;
  enableLoader(true);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = data.data[0].temp;
      weather.description = data.data[0].weather.description;
      weather.iconId = data.data[0].weather.icon;
      weather.city = data.data[0].city_name;
      weather.country = data.data[0].country_code;
      weather.aq = data.data[0].aqi;
      weather.winsp = data.data[0].wind_spd;
      weather.vis = data.data[0].vis;
      weather.wini = data.data[0].wind_cdir_full;
      weather.uv = data.data[0].uv;
    })
    .then(function () {
      displayWeather();
    })
    .catch((e) => {
      console.log(e);
      enableLoader(false);
    });
}

function displayWeather() {
  enableLoader(false);
  iconElement.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  aqElement.innerHTML = weather.aq;
  winspElement.innerHTML = weather.winsp;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  visibleElement.innerHTML = weather.vis;
  winddirElement.innerHTML = weather.wini;
  uvElement.innerHTML = weather.uv;
}

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

tempElement.addEventListener("click", function () {
  // WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});
