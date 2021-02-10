var APIKey = '9773795b91f45a7a1a6e86d5ff0d4d2e'


var weatherData
var currentTemperature

var minTemp
var maxTemp
var feelsLike
var coords
var cityName 

var data
var fullResponse

var button = document.querySelector('.btn')
var inputLocation = document.querySelector('.inputLocation')
var c = document.querySelectorAll('.col')




inputLocation.addEventListener('change', ()=>{
    if(inputLocation.value === 'Location'){
        inputLocation.value = ''
    }
    cityName = inputLocation.value
})

// inputLocation.addEventListener('mouseover', ()=>{
//     // inputLocation.classList.toggle('')
// })

button.addEventListener('click', ()=>{

    console.log(cityName)
    
    // remove Animation Class
    currentTemperatureElement.classList.remove('text')
    MinTemperatureElement.classList.remove('text')
    MaxTemperatureElement.classList.remove('text')
    feelsLikeElement.classList.remove('text')

    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showData(data)
    });    
})


// Querry Selectors
var currentTemperatureElement = document.querySelector('.main-temp')
var MinTemperatureElement = document.querySelector('.low')
var MaxTemperatureElement = document.querySelector('.high')
var feelsLikeElement = document.querySelector('.real')

// var lat = document.querySelector('#lat')
// var long = document.querySelector('#lon')


function showData(data){
    console.log(data)
    // 
    weatherData = data
    //    
    currentTemperature = weatherData.main.temp - 273.15
    minTemp = weatherData.main.temp_min - 273.15
    maxTemp = weatherData.main.temp_max - 273.15
    feelsLike = weatherData.main.feels_like - 273.15

    // coords = weatherData.coord
    
    // Add Animation Class
    currentTemperatureElement.classList.add('text')
    MinTemperatureElement.classList.add('text')
    MaxTemperatureElement.classList.add('text')
    feelsLikeElement.classList.add('text')
    
    currentTemperatureElement.innerHTML = currentTemperature.toFixed(1) + ' &#176;C'
    MinTemperatureElement.innerHTML = 'Today Low ' + minTemp.toFixed(2) + ' &#176;C'
    MaxTemperatureElement.innerHTML = 'Today High ' + maxTemp.toFixed(2) + ' &#176;C'
    feelsLikeElement.innerHTML =  'Real Feel '+ feelsLike.toFixed(1) + ' &#176;C'
    
    // lat.innerHTML = `Lat:${coords.lat.toFixed(2)}`
    // long.innerHTML = `Lon:${coords.lon.toFixed(2)}`
}
    