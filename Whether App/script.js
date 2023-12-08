// console.log("weather application...");

// const API_KEY = "8d3e8cd1814c2e7715e927ea987f10b6";
// // https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}

// async function showweather() {
//     let latitude = 22.3072;
//     let longitude = 73.1812;

//     const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
//     );

//     const data = await response.json();
//     console.log("weather data : ", data);

//     let newPara = document.createElement('p');
//     newPara.textContent = `Country Name : ${data?.city?.name} , Population : ${data?.city?.population}`;

//     document.body.appendChild(newPara);
// }

// data for API
const API_KEY = "8d3e8cd1814c2e7715e927ea987f10b6";

// fetching tabs
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

// parent container
const parentContainer = document.querySelector(".weather-container");

// now we fetching containers 
const locationContainer = document.querySelector(".grantLocation-container");
const searchFormContainer = document.querySelector(".form-container");
const loadingContainer = document.querySelector(".loading-container");


// main user weather details container
const dashboardContainer = document.querySelector(".user-info-weather");


// data for tab switching 
let currentTab = userTab;
currentTab.classList.add("current-tab");

// functioning of switching tab

userTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    // pass clicked tab as input parameter
    switchTab(searchTab);
});

// function switchTab(); -- clickedtab is parameter
function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchFormContainer.classList.contains("active")) {
            loadingContainer.classList.remove("active");
            dashboardContainer.classList.remove("active");
            // add classlist active in searchform for visible on screen
            searchFormContainer.classList.add("active");
        }
        else {
            // me pehle search tab per tha or ab user tab per switch karna he
            searchFormContainer.classList.remove("active");
            dashboardContainer.classList.remove("active");
            // we remove both and display only weather data through cordinates saved in session storage
            getFromSessionStrorage();

        }
    }
}

// check of cordinates are alrady present in local session storage
function getFromSessionStrorage() {
    const localCordinates = sessionStorage.getItem("user-cordinates");
    if (!localCordinates) {
        // agar cordinates nahi he to user ke pass se location access mang ke cordinates save karne he
        locationContainer.classList.add("active");
    } else {
        const cordinates = JSON.parse(localCordinates);
        // fetching data through api using cordinates
        featchUserWeatherInfo(cordinates);
    }
}

// hear we dealing with API
async function featchUserWeatherInfo(cordinates) {
    const { lat, lon } = cordinates;
    // make grant location container invisible and make loader visible
    locationContainer.classList.remove("active");
    // loader visible
    loadingContainer.classList.add("active");

    // API CALL
    try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

        // first convert data into json formate
        const data = await resp.json();

        // after data fetching we disapering loader and display weather data container dashboard
        loadingContainer.classList.remove("active");
        // visible dashboard container
        dashboardContainer.classList.add("active");

        // now we render fetched data on ui screen
        renderWheatherInfo(data);

    } catch (e) {
        loadingContainer.classList.remove("active");

        console.log("Error occured during API fetch : ", e);
    }
}

// render function
async function renderWheatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const weatherDesc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temprature = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const clouds = document.querySelector("[data-cloudiness]");

// fetch values from wheather 
    // cityName.innerText = weatherInfo?.city?.name;
    // countryIcon.src = `https://flagcdn.com/144*108/${weatherInfo?.city?.country.toLowerCase()}.png`;
    // weatherDesc.innerText = weatherInfo?.list?.[0]?.description;
    // weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.list?.[0]?.icon}.png`;
    // temprature.innerText = weatherInfo?.list?.main?.temp;
    // windspeed.innerText = weatherInfo?.list?.wind?.speed;
    // humidity.innerText = weatherDesc?.list?.[3]?.main.humidity;
    // clouds.innerText = weatherDesc?.list?.[3].clouds?.all;
    
    cityName.innerText = weatherInfo.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temprature.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.list?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    clouds.innerText = weatherInfo?.clouds?.all;
    console.log(weatherInfo);
    console.log(cityName);
    console.log(temprature);
    

    

}


// listner for grant access listner
const grantAccessBtn = document.querySelector("[data-grantAcess]");
grantAccessBtn.addEventListener("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("no geo-location support available.")
    }
}

async function showPosition(position){
    const userCordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    sessionStorage.setItem("user-cordinates",JSON.stringify(userCordinates));
    featchUserWeatherInfo(userCordinates);
    console.log(userCordinates);
}

async function featchUserWeatherInfo(city){
    loadingContainer.classList.add("active");
    dashboardContainer.classList.remove("active");
    loadingContainer.classList.remove("active");

    // api call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        const data = await response.json();
        loadingContainer.classList.remove("active");
        dashboardContainer.classList.add("active");
        renderWheatherInfo(data);
    }
    catch(e){
        console.log("error at featchUserWeatherInfo.");
    }

}
