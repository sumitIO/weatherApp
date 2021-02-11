// API KEY to GET data
var APIKey = '9773795b91f45a7a1a6e86d5ff0d4d2e'

// local variables
var data = ''
var weatherData = ''
var cityName  = ''
var currentTemperature = ''
var feelsLike = ''


// QUERY SELECTORS
var inputCity = document.querySelector('.inputLocation')
var searchButton = document.querySelector('.btn')
var currentTemperatureElement = document.querySelector('.main-temp')
var feelsLikeElement = document.querySelector('.real')


// EVENT LISTENERS
inputCity.addEventListener('click', ()=>inputCity.value = '')
inputCity.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        requestHandler()
    }
})
searchButton.addEventListener('click', requestHandler)


// EVENT HANDLERS
function requestHandler(){
    // remove Animation Class
    cityName = inputCity.value
    if(cityName == '' || cityName =='Location'){
        return alert('Enter a City Name')
    }
    currentTemperatureElement.classList.remove('text')
    feelsLikeElement.classList.remove('text')

    // UPDATE URL
    url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
    // fetch(URL) returns a Promise
    // // console.log(fetch(url))
    // fetch(url).then(res => console.log(res))

    // res.json() Returns Another Promise
    // GET REQUEST
    fetch(url)
        .then(res => {
            if(res.ok){
                console.log('SUCCESS')
                return res.json()
            }else{
                alert('City Not Found!')
                console.log('NOT SUCCESS')
            }
            })
        .then(data => displayTemp(data))
}


// FUNCTIONS
function displayTemp(data){
    // log the JSON data
    console.log(data)
    // copy data to local variables
    weatherData = data
    currentTemperature = weatherData.main.temp - 273.15
    feelsLike = weatherData.main.feels_like - 273.15

    // Add Animation Class
    currentTemperatureElement.classList.add('text')
    feelsLikeElement.classList.add('text')
    // Render HTML
    currentTemperatureElement.innerHTML = currentTemperature.toFixed(1) + ' &#176;C'
    feelsLikeElement.innerHTML =  'Real Feel '+ feelsLike.toFixed(1) + ' &#176;C'
}