function getCurrentPosition(position) {
  let apiKey = "fb8b95424c106907f53c4fc0092c4971";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currently-temp");
  currentTemp.innerHTML = `${temperature}°F`;
  let currentCity = document.querySelector(".currently-city");
  let currentCityName = response.data.name;
  currentCity.innerHTML = `${currentCityName}`;
  let country = document.querySelector(".currently-country");
  let currentCountryName = response.data.sys.country;
  country.innerHTML = `${currentCountryName}`;
  let iconElement = document.querySelector("#currentlyIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function callNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function beginSearch(event) {
  event.preventDefault();
  let city = document.querySelector(".currently-city");
  city.innerHTML = `${searchInput.value.trim().toUpperCase()}`;
  let apiK = "fb8b95424c106907f53c4fc0092c4971";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiK}`;
  axios.get(apiUrl).then(showTemperatureByCity);
}

function showTemperatureByCity(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".currently-temp");
  currentTemp.innerHTML = `${temperature}°F`;
  let country = document.querySelector(".currently-country");
  let countryName = response.data.sys.country;
  country.innerHTML = `${countryName}`;
  let iconElement = document.querySelector("#currentlyIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
  let windElement = document.querySelector(".wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind ${windSpeed}mph`;
  let humElement = document.querySelector(".humidity");
  let humidityPercent = Math.round(response.data.main.humidity);
  humElement.innerHTML = `Humidity ${humidityPercent}%`;
  let currentDesc = document.querySelector(".current-desc");
  let currentDescriptionTitle = response.data.weather[0].description;
  currentDesc.innerHTML = `${currentDescriptionTitle.toUpperCase()}`;
}

function showDefaultCity() {
  let city = document.querySelector(".currently-city");
  city.innerHTML = `Houston`;
  let apiK = "fb8b95424c106907f53c4fc0092c4971";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid=${apiK}`;
  axios.get(apiUrl).then(showTemperatureByCity);
}

let useCurrent = document.querySelector("#use-current");
useCurrent.addEventListener("click", callNavigator);

let searchInput = document.querySelector("#search-box");
let submitButton = document.querySelector(".search-bar");
submitButton.addEventListener("submit", beginSearch);

showDefaultCity();
