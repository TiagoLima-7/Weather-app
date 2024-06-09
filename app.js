//OpenWeatherMap API Key
const apiKey = "18ea632713a097c41ff99ad2ca0d69bc";

//Input et display de la ville indique par l'utilisateur
const inputCity = document.querySelector("#city");
const cityDisplayed = document.querySelector(".city h2");


inputCity.addEventListener("change", () =>{
    city = inputCity.value;

    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric&lang=fr"

    async function checkWeather(){
        
        const reponse = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json'
                }
            }
        );
        //console.log(reponse);
        var data = await reponse.json();
        console.log(data);
   
    const temp = data.main.temp;
    const sensationTermique = data.main.feels_like;
    const tempMin = Math.round(data.main.temp_min) + "°c";
    const tempMax = Math.round(data.main.temp_max) + "°c";
    const humidity = data.main.humidity;
    const ville = data.name + "," + data.sys.country;
    const windSpeed = data.wind.speed;
    const backgroundWeather = data.weather[0].main
    const windDegrees = data.wind.deg;

    //degrees pour directions
    function degToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "N-NE", "NE", "E-NE", "E", "E-SE", "SE", "S-SE", "S", "S-SW", "SW", "W-SW", "W", "W-NW", "NW", "N-NW"];
        return arr[(val % 16)];
    }

    const windDirection = degToCompass(windDegrees);

    cityDisplayed.innerHTML = ville;
    var tempDisplay = document.getElementsByClassName('temp');
    var ciel = document.querySelector(".detailsCiel p");
    var windDetails = document.querySelector('.windDetails p span');
    var humidityDetails = document.querySelector(".humidityDetails p span");
    var ressenti = document.querySelector(".ressenti span");
    var minDisplay = document.querySelector("#min");
    var maxDisplay = document.querySelector("#max");
    var weatherIcon = document.querySelector("#weatherIcon");

    ciel.innerHTML = data.weather[0].description;
    ressenti.innerHTML = Math.round(sensationTermique) + "°c"
    tempDisplay[0].innerHTML = Math.round(temp) + "°c";
    windDetails.innerHTML = Math.round(windSpeed) + "Km/h Direction " + windDirection;
    humidityDetails.innerHTML = humidity + "%";
    minDisplay.innerHTML = tempMin;
    maxDisplay.innerHTML = tempMax;
    document.body.style.backgroundImage = 'url(./img/background/' + backgroundWeather + '.jpg)';
    weatherIcon.src = "./img/" + backgroundWeather + ".png";
    }
    checkWeather();
});





