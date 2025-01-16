function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let timeElement=document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
     
    
    temperatureElement.innerHTML= Math.round(temperature);
    descriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML=`${response.data.temperature.humidity}%`;
    windElement.innerHTML=`${response.data.wind.speed}km/h`;
    timeElement.innerHTML= formatDate(date);
    city.innerHTML=response.data.city;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/> `;
     
}

function formatDate(date){
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes},` 

    }


function searchCity(city){
    let apiKey = "7cb48858f3d457ao4f0b447cccc30t2f";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    //console.log(apiUrl);
   axios.get(apiUrl).then(refreshWeather);


}



function handleSearchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");
let city = document.querySelector("#city");
searchCity(searchInput.value);

}

function displayForecast () {

    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    days.forEach(function (day) {

    
forecastHtml = forecastHtml + `<div class="weather-forecast-day">
<div class="weather-forecast-date">${day}</div>
 <div class="weather-forecast-icon">☀️</div>
  <div class="weather-forecast-temperatures"> 
   <div class="weather-forecast-temperature"> 
    <strong>15º</strong>
   </div>
     <div class="weather-forecast-temperature">9º</div>
  </div>
</div>`;
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); 
displayForecast();
searchCity("New York");

