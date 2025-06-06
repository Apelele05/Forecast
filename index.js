function refreshWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureMainElement = document.querySelector("#temperature-main");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
  console.log(response.data);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(wind)} km/h`;
  temperatureMainElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "fo68et34d0e7d6af2ae13cd3f76c33b0";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=" +
    city +
    "&key=" +
    apiKey +
    "&units=metric";

  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch(function (error) {
      console.error("Error fetching weather:", error);
    });
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fo68et34d0e7d6af2ae13cd3f76c33b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");

  let forecastHtml = " ";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatForecastDate(
              day.time
            )}</div>
            <div class="weather-forecast-icon"><img src="${
              day.condition.icon_url
            }" alt="${day.condition.description}">
</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.maximum
              )}&deg;</div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}&deg;</div>
            </div>
          </div>
        </div>`;
    }
  });
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

getForecast("Paris");
