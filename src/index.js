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
  let windElement = document.querySelector(".wind");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `Wind ${windSpeed}mph`;
  let humElement = document.querySelector(".humidity");
  let humidityPercent = Math.round(response.data.main.humidity);
  humElement.innerHTML = `Humidity ${humidityPercent}%`;
  let currentDesc = document.querySelector(".current-desc");
  let currentDescriptionTitle = response.data.weather[0].description;
  currentDesc.innerHTML = `${currentDescriptionTitle.toUpperCase()}`;
  getForecast(response.data.coord);
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
  getForecast(response.data.coord);
}

function showDefaultCity() {
  let city = document.querySelector(".currently-city");
  city.innerHTML = `Houston`;
  let apiK = "fb8b95424c106907f53c4fc0092c4971";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Houston&units=imperial&appid=${apiK}`;
  axios.get(apiUrl).then(showTemperatureByCity);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `    
                <div class="forecast-date col">${formatDay(
                  forecastDay.dt
                )} <br /></div>
                <div class="weather-icon col">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="" width="70px"/>
                </div>
                <div class="forecast-high col">
                  High <strong><br />${Math.round(
                    forecastDay.temp.max
                  )}°F</strong>
                </div>
                <div class="forecast-low col">
                  Low <strong><br />${Math.round(
                    forecastDay.temp.min
                  )}°F</strong>
                </div>
                <div class="forecast-temp-descrip col">${forecastDay.weather[0].description.toUpperCase()}</div>
                      <hr />`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiK = "fb8b95424c106907f53c4fc0092c4971";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiK}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function viewTenDay(event) {
  let tenDayCity = document.getElementById("currentlyCity").innerText;

  window.open(
    `https://www.google.com/search?q=10+day+forecast+${tenDayCity}`,
    "_blank"
  );
}

let useCurrent = document.querySelector("#use-current");
useCurrent.addEventListener("click", callNavigator);

let searchInput = document.querySelector("#search-box");
let submitButton = document.querySelector(".search-bar");
submitButton.addEventListener("submit", beginSearch);

let tenDayBtn = document.querySelector("#tenDay");
tenDayBtn.addEventListener("click", viewTenDay);

showDefaultCity();
