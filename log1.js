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

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "510b2eea4a2a4069b39e619d9f932f25";

var l1 = "";


geos();


function geo(){
    geos();
}


function b1(l1){
    l1 = document.getElementById("tex").value;
    getsearch(l1);
}

function getsearch(l1){
    getWeather1(l1);
}

function enableLoader(value) {
    if(value) {
        document.querySelector("#g1").style.display = "none";
        document.querySelector("#g2").style.display = "block";
    } else {
        document.querySelector("#g1").style.display = "block";
        document.querySelector("#g2").style.display = "none";
    }
}

async function getWeather1(searchtext){
    let api = await `https://api.weatherbit.io/v2.0/current?city=${searchtext}&key=${key}`;
    enableLoader(true);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
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
        .then(function(){
            displayWeather();
        })
        .catch((e) => {
            console.log(e);
            enableLoader(false);
        });
}

function geos(){
    // CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
}







// SET USER'S POSITION

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
async function getWeather(latitude, longitude){
    let api = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${key}`;
    enableLoader(true);
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
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
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
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

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

