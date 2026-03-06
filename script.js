const apiKey = "40efbaa58a0a19ff3aed9217d6f4c723"

async function getWeather(){

const city = document.getElementById("cityInput").value

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`

const response = await fetch(url)

const data = await response.json()

showWeather(data)

getForecast(city)

}

function showWeather(data){

document.getElementById("city").innerText = data.name

document.getElementById("temp").innerText =
Math.round(data.main.temp)+"°C"

document.getElementById("description").innerText =
data.weather[0].description

document.getElementById("icon").src =
`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

climateMessage(data.main.temp)

changeBackground(data.weather[0].main.toLowerCase())

}

function climateMessage(temp){

let msg=""

if(temp<10){

msg="❄️ Muito frio"

}
else if(temp<20){

msg="🧥 Clima fresco"

}
else if(temp<30){

msg="☀️ Clima agradável"

}
else{

msg="🔥 Muito calor"

}

document.getElementById("message").innerText=msg

}

async function getForecast(city){

const url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`

const response = await fetch(url)

const data = await response.json()

const forecastDiv = document.getElementById("forecast")

forecastDiv.innerHTML=""

for(let i=0;i<5;i++){

const item = data.list[i*8]

const date = new Date(item.dt_txt)
.toLocaleDateString("pt-BR",{weekday:"short"})

forecastDiv.innerHTML += `

<div class="forecast-day">

<p>${date}</p>

<img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">

<p>${Math.round(item.main.temp)}°C</p>

</div>

`

}

}

function changeBackground(weather){

document.body.className=""

if(weather.includes("rain")){

document.body.classList.add("rain")

}
else if(weather.includes("cloud")){

document.body.classList.add("cloud")

}
else if(weather.includes("clear")){

document.body.classList.add("sunny")

}

}

/* geolocalização automática */

function getLocation(){

navigator.geolocation.getCurrentPosition(async(position)=>{

const lat = position.coords.latitude
const lon = position.coords.longitude

const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`

const response = await fetch(url)

const data = await response.json()

showWeather(data)

getForecast(data.name)

})

}

window.onload = getLocation