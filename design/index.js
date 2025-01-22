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
   
    getForecast(response.data.city);
     
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

    function formatDay (timestamp) {
        let date = new Date (timestamp * 1000);
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        return days[date.getDay()];
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

function displayForecast (response) {
    console.log(response.data);



    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if(index < 5) {

    
forecastHtml = forecastHtml + `<div class="weather-forecast-day">
<div class="weather-forecast-date">${formatDay(day.time)}</div>
  <img class="weather-forecast-icon" src="${day.condition.icon_url}" />
 
  <div class="weather-forecast-temperatures"> 
   <div class="weather-forecast-temperature"> 
    <strong>${Math.round(day.temperature.maximum)}°</strong>
   </div>
     <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
  </div>
</div>`;
        }
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

}

function getForecast (city){
    let apiKey="7cb48858f3d457ao4f0b447cccc30t2f";
    let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); 



searchCity("New York");

