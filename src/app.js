//Date Section
let now = new Date();
let dateP = document.querySelector(".main-date");

let hour = now.getHours();
let minute = now.getMinutes();
if(minute < 10) {
  minute = `0${minute}`;
}     

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let day = days[now.getDay()];

dateP.innerHTML = `${day} ${hour}:${minute}`;

//Search City Section
let form = document.querySelector("#search-form");

function getCity(response) {
    celsiusTemperature = response.data.main.temp;

    let currentLocation = document.querySelector(".main-location");
    currentLocation.innerHTML = `${response.data.name}`;

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${response.data.main.humidity}% `;

    let wind = document.querySelector(".wind");
    wind.innerHTML = `${response.data.wind.speed} `;
    
    let description = document.querySelector(".description");
    description.innerHTML = `${response.data.weather[0].description} `

    let temperature = document.querySelector(".temp-cntr");
    let roundTemp = Math.round(celsiusTemperature);
    temperature.innerHTML = ` ${roundTemp}°`;

    let icon = document.querySelector("#image-icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apiKey = "ccf19c51fd8853a7a4ab6eed24c916ed"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getCity);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-text-input");
    search(cityInputElement.value);
}   

form.addEventListener("submit", handleSubmit);

//Button Bonus
function updateCity(response){
    celsiusTemperature = response.data.main.temp;

    let currentLocation = document.querySelector(".main-location");
    currentLocation.innerHTML = `${response.data.name}`;

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${response.data.main.humidity}% `;

    let wind = document.querySelector(".wind");
    wind.innerHTML = `${response.data.wind.speed} `;
    
    let description = document.querySelector(".description");
    description.innerHTML = `${response.data.weather[0].description} `

    let temperature = document.querySelector(".temp-cntr");
    let roundTemp = Math.round(celsiusTemperature);
    temperature.innerHTML = ` ${roundTemp}°`

    let icon = document.querySelector("#image-icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);

}

function showPosition(position) {
    let apiKey = "ccf19c51fd8853a7a4ab6eed24c916ed"
    let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    
    axios.get(apiLink).then(updateCity);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#location-btn");
button.addEventListener("click", getCurrentPosition);

//Temp Converter Section
function showFahrenheit(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 1.8) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function showCelsius(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//Forecast Section

function displayForecast(){
    let forecastElement = document.querySelector("#forecast")
    let days = ["Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
   
    let forecastHTML = `<div class="row">`;
        forecastHTML = forecastHTML + `
                <div class="col weather-forecast-date col-one" id="forecast">
                    Sunday
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="25px" class="forecast-icon">
                    <div class="weather-forecast-temperature">
                        <span class="weather-temperature-weather-max">18° </span>
                        <span class="weather-temperature-weather-min">14°</span>
                    </div>
                </div>`;
    forecastHTML = forecastHTML + `      
                <div class="col weather-forecast-date col-one" id="forecast">
                    Sunday
                    <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="25px" class="forecast-icon">
                    <div class="weather-forecast-temperature">
                        <span class="weather-temperature-weather-max">18° </span>
                        <span class="weather-temperature-weather-min">14°</span>
                    </div>
                </div>`;

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML
}

//Global Var
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fah-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("New York");
displayForecast();