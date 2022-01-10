
const locationInput = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const key = "50e080213b393ab06704d85847bbe27e"

function init(key){
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+locationInput.location+"&units=metric&appid="+key)
    .then(response => {
        if (!response.ok){
            alert("No weather found")
            throw new Error("No weather found")
        }
        return response.json();
    })
    .then((data) => displayCurrentWeather(data));
}



function displayCurrentWeather(data){
    //Display header
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset} = data.sys;

    //Display current weather header
    var header = document.querySelector(".header")
    var p = document.createElement("p")
    p.appendChild(document.createTextNode("CURRENT WEATHER IN   "+ name.toUpperCase()))
    header.appendChild(p)

    //Display 5 day / 3 hour forecast weather header
    var header = document.querySelector(".header2")
    var p = document.createElement("p")
    p.appendChild(document.createTextNode("5 DAY / 3 HOUR FORECAST WEATHER IN "+ name.toUpperCase()))
    header.appendChild(p)


    var sunriseHour = new Date(sunrise * 1000)
    var sunsetHour = new Date(sunset * 1000)

    //Display current weather data
    document.querySelector(".temperature").innerText = "Temperature: " +temp+ " ºC"
    document.querySelector(".feels_like").innerText = "Feels like: "+feels_like+ " ºC"
    document.querySelector(".iconImage").src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";
    document.querySelector(".description").innerText = description.toUpperCase();
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hPa"
    document.querySelector(".sunrise").innerText = "Sunrise: " + sunriseHour.getHours() +":"+ sunriseHour.getMinutes()+" UTC time"
    document.querySelector(".sunset").innerText = "Sunset: " + sunsetHour.getHours() +":"+ sunsetHour.getMinutes()+" UTC time"


    fetch("https://api.openweathermap.org/data/2.5/forecast?q="+locationInput.location+"&units=metric&appid="+key)
    .then(response => {
        if (!response.ok){
            alert("No weather found")
            throw new Error("No weather found")
        }
        return response.json();
    })
    .then((data) => displayWeatherForecast(data));
}
    
//Display 5 day / 3 hour forecast data
function displayWeatherForecast(data){

    console.log(data)
    var lat = data.city.coord['lat']
    var lon = data.city.coord['lon']

    for (let i = 0; i < 40; i++){
        var date = data.list[i].dt
        var temp = data.list[i].main['temp']
        //var tempMax = data.list[i].main['temp_max']
        //var tempMin = data.list[i].main['temp_min']
        var weatherDate = new Date(date*1000).toString().replace("GMT+0100 (Hora padrão da Europa Central)", "")

        //Display day and hour for each day/interval of forecast
        var dayDiv = document.getElementById(i.toString())
        var p = document.createElement("p")
        p.appendChild(document.createTextNode(weatherDate))
        dayDiv.appendChild(p)

        //Display temperature for each day/interval of forecast
        var pTemperature = document.createElement("p")
        pTemperature.appendChild(document.createTextNode("Temp.: "+temp+ "ºC"))
        dayDiv.appendChild(pTemperature)
    }

    displayPrecipitationMap(lat, lon)
    displayTemperatureMap(lat, lon)
    displayPressureMap(lat, lon)
    displayWindSpeedMap(lat, lon)
    displayCloudsMap(lat, lon)
}

//Display precipitation map
function displayPrecipitationMap(lat, lon){
    var object = document.createElement("object")
    var map = document.getElementById("mapPrecipitation")
    $(object).addClass("precipitationMap")
    object.setAttribute("type", "text/html")
    object.setAttribute("data", "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat="+lat+"&lon="+lon+"zoom=10")
    map.appendChild(object);
}

//Display temperature map
function displayTemperatureMap(lat, lon){
    var object = document.createElement("object")
    var map = document.getElementById("mapTemperature")
    $(object).addClass("temperatureMap")
    object.setAttribute("type", "text/html")
    object.setAttribute("data", "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat="+lat+"&lon="+lon+"zoom=10")
    map.appendChild(object);
}

//Display pressure map
function displayPressureMap(lat, lon){
    var object = document.createElement("object")
    var map = document.getElementById("mapPressure")
    $(object).addClass("pressureMap")
    object.setAttribute("type", "text/html")
    object.setAttribute("data", "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=pressure&lat="+lat+"&lon="+lon+"zoom=10")
    map.appendChild(object);
}

//Display windspeed map
function displayWindSpeedMap(lat, lon){
    var object = document.createElement("object")
    var map = document.getElementById("mapWindSpeed")
    $(object).addClass("windspeedMap")
    object.setAttribute("type", "text/html")
    object.setAttribute("data", "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat="+lat+"&lon="+lon+"zoom=10")
    map.appendChild(object);
}

//Display clouds map
function displayCloudsMap(lat, lon){
    var object = document.createElement("object")
    var map = document.getElementById("mapClouds")
    $(object).addClass("cloudsMap")
    object.setAttribute("type", "text/html")
    object.setAttribute("data", "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat="+lat+"&lon="+lon+"zoom=10")
    map.appendChild(object)
}


init(key)