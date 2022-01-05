const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

const getForecast = (location) => {
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.innerHTML = "<strong>Weather Condition:</strong> " + data.forecastData.description + "</br>" +
                                 "<strong>Current Temperature:</strong> " + data.forecastData.temperature + "°C" + "</br>" +
                                 "<strong>Perceived Temperature:</strong> " + data.forecastData.feelsLike + "°C" + "</br>" +
                                 "<strong>Wind Speed:</strong> " + data.forecastData.wind_speed + " Km/h" + "</br>" +
                                 "<strong>Pressure:</strong> " + data.forecastData.pressure + " Millibar" + "</br>" + 
                                 "<strong>Humidity:</strong> " + data.forecastData.humidity + "%" + "</br>" +
                                 "<strong>UV Index:</strong> " + data.forecastData.uv_index;
      }
    });
  });
};

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchElement.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  getForecast(location);
});
