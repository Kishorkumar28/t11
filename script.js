document.addEventListener("DOMContentLoaded", function () {
    const countryCardsContainer = document.getElementById("country-cards");
  
    // Fetch country data from REST Countries API
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                // Extracting necessary information
                const capital = country.capital[0];
                const latlng = country.latlng.join(", ");
                const flag = country.flags.png;
                const region = country.region;
                const name = country.name.common;
                const countryCodes = Object.keys(country.cca2).join(", ");
  
                // Create Bootstrap card
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "col-md-4", "col-sm-6", "col-xl-4");
                card.innerHTML = `
                    <div class="card h-100">
                        <img src="${flag}" class="card-img-top" alt="Flag">
                        <div class="card-body card-header ">
                            <h5 class="card-title Native Name">${name}</h5>
                            <p class="card-text"><strong>Capital:</strong> ${capital}</p>
                            <p class="card-text"><strong>Latlng:</strong> ${latlng}</p>
                            <p class="card-text"><strong>Region:</strong> ${region}</p>
                            <p class="card-text"><strong>Country Codes:</strong> ${countryCodes}</p>
                            <div class="card-text">
                              <p>Region</p>
                              <p>Native name</p>
                              <p>Population</p>
                          </div>
                            <button class="btn btn-primary btn-block" onclick="fetchWeather('${name}')">Click for Weather</button>
                            <div id="weather-info-${name}"></div>
                        </div>
                    </div>
                `;
  
                countryCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.log("Error fetching country data:", error));
  });
  
  function fetchWeather(countryName) {
    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=6314eeb6835ad85e317814783e2c5e7e`)
        .then(response => response.json())
        .then(weatherData => {
            // Extract weather information
            const weatherInfoContainer = document.getElementById(`weather-info-${countryName}`);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            const weatherinfo=`Temperature: ${temperature},K \n Weather Description: ${weatherDescription}`
            alert(weatherinfo)
            // Update weather information in the card
            weatherInfoContainer.innerHTML = `
                <p class="card-text"><strong>Temperature:</strong> ${temperature} K</p>
                <p class="card-text"><strong>Weather Description:</strong> ${weatherDescription}</p>
            `;
        })
        .catch(error => console.log("Error fetching weather data:", error));
  }
  