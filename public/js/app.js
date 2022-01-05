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
        messageTwo.innerHTML = "Weather Condition: " + data.forecastData.description + "</br>" +
                                 "Current Temperature: " + data.forecastData.temperature + "°C" + "</br>" +
                                 "Perceived Temperature: " + data.forecastData.feelsLike + "°C";
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
