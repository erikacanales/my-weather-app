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
    let currentLocation = document.querySelector(".main-location");
    currentLocation.innerHTML = `${response.data.name}`;

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${response.data.main.humidity}% `;

    let wind = document.querySelector(".wind");
    wind.innerHTML = `${response.data.wind.speed} `;
    
    let description = document.querySelector(".description");
    description.innerHTML = `${response.data.weather[0].description} `

    let temperature = document.querySelector(".temp-cntr");
    let roundTemp = Math.round(response.data.main.temp);
    temperature.innerHTML = ` ${roundTemp}°`;

    let icon = document.querySelector("#image-icon");
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
}

function search(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input");
    let apiKey = "ccf19c51fd8853a7a4ab6eed24c916ed"
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getCity);
}

form.addEventListener("submit", search);

//Search Engine API
//let city = document.querySelector("#search-text-input");



//Button Bonus
function updateCity(response){
    let currentLocation = document.querySelector(".main-location");
    currentLocation.innerHTML = `${response.data.name}`;

    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${response.data.main.humidity}% `;

    let wind = document.querySelector(".wind");
    wind.innerHTML = `${response.data.wind.speed} `;
    
    let description = document.querySelector(".description");
    description.innerHTML = `${response.data.weather[0].description} `

    let temperature = document.querySelector(".temp-cntr");
    let roundTemp = Math.round(response.data.main.temp);
    temperature.innerHTML = ` ${roundTemp}°`
    
    console.log(response);

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