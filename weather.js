document.addEventListener('DOMContentLoaded', function() {
    const citySelect = document.getElementById('city-select');
    const searchBtn = document.getElementById('search-btn');
    const weatherDisplay = document.getElementById('weather-display');
    const currentWeather = document.getElementById('current-weather');
    const forecastTitle = document.getElementById('forecast-title');
    const forecastContainer = document.getElementById('forecast-container');
    
    // Weather conditions for Sri Lanka's climate
    const weatherConditions = [
        { condition: 'Sunny', icon: '☀️', minTemp: 28, maxTemp: 34 },
        { condition: 'Partly Cloudy', icon: '⛅', minTemp: 26, maxTemp: 32 },
        { condition: 'Cloudy', icon: '☁️', minTemp: 25, maxTemp: 30 },
        { condition: 'Light Rain', icon: '🌦️', minTemp: 24, maxTemp: 29 },
        { condition: 'Heavy Rain', icon: '🌧️', minTemp: 22, maxTemp: 27 },
        { condition: 'Thunderstorm', icon: '⛈️', minTemp: 23, maxTemp: 28 }
    ];
    
    // Get random weather condition
    function getRandomWeather() {
        return weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    }
    
    // Generate random temperature between min and max
    function getRandomTemp(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Get random humidity
    function getRandomHumidity() {
        return Math.floor(Math.random() * 40) + 60; // 60-100%
    }
    
    // Get random wind speed
    function getRandomWind() {
        return (Math.random() * 20 + 5).toFixed(1); // 5-25 km/h
    }
    
    // Get random precipitation chance
    function getRandomPrecipitation() {
        return Math.floor(Math.random() * 100); // 0-100%
    }
    
    // Generate dates for forecast
    function getDateString(daysFromNow) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    }
    
    // Generate weather forecast for a city
    function generateForecast(city) {
        const currentWeatherData = getRandomWeather();
        const currentTemp = getRandomTemp(currentWeatherData.minTemp, currentWeatherData.maxTemp);
        
        // Update current weather
        document.getElementById('city-name').textContent = city + ' - Current Weather';
        document.getElementById('weather-icon').textContent = currentWeatherData.icon;
        document.getElementById('current-temp').textContent = currentTemp + '°C';
        document.getElementById('current-condition').textContent = currentWeatherData.condition;
        document.getElementById('humidity').textContent = getRandomHumidity() + '%';
        document.getElementById('wind-speed').textContent = getRandomWind() + ' km/h';
        document.getElementById('precipitation').textContent = getRandomPrecipitation() + '%';
        document.getElementById('last-updated').textContent = new Date().toLocaleTimeString();
        
        // Show current weather and forecast title
        currentWeather.style.display = 'block';
        forecastTitle.style.display = 'block';
        
        // Clear previous forecast
        forecastContainer.innerHTML = '';
        
        // Generate 5-day forecast
        for (let i = 1; i <= 5; i++) {
            const dayWeather = getRandomWeather();
            const maxTemp = getRandomTemp(dayWeather.minTemp, dayWeather.maxTemp);
            const minTemp = maxTemp - Math.floor(Math.random() * 5) - 2;
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            
            forecastDay.innerHTML = `
                <h3>${getDateString(i)}</h3>
                <div class="day-weather-icon">${dayWeather.icon}</div>
                <div class="day-weather-details">
                    <p>Condition: ${dayWeather.condition}</p>
                    <p>Max Temp: ${maxTemp}°C</p>
                    <p>Min Temp: ${minTemp}°C</p>
                    <p>Humidity: ${getRandomHumidity()}%</p>
                    <p>Precipitation: ${getRandomPrecipitation()}%</p>
                </div>
            `;
            
            forecastContainer.appendChild(forecastDay);
        }
    }
    
    // Handle search button click
    searchBtn.addEventListener('click', function() {
        const selectedCity = citySelect.value;
        
        if (selectedCity === '') {
            weatherDisplay.innerHTML = '<p>Please select a city to view the weather forecast</p>';
            currentWeather.style.display = 'none';
            forecastTitle.style.display = 'none';
            forecastContainer.innerHTML = '';
            return;
        }
        
        weatherDisplay.innerHTML = `<p>Loading weather data for ${selectedCity}...</p>`;
        
        // Simulate loading delay
        setTimeout(() => {
            weatherDisplay.innerHTML = '';
            generateForecast(selectedCity);
        }, 800);
    });
});