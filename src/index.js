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
}

let useCurrent = document.querySelector("#use-current");
useCurrent.addEventListener("click", callNavigator);

let searchInput = document.querySelector("#search-box");
let submitButton = document.querySelector(".search-bar");
submitButton.addEventListener("submit", beginSearch);
