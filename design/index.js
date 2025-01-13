function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML= Math.round(temperature);
    city.innerHTML=response.data.city;

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



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit); 

searchCity("New York");