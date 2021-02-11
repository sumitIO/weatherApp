// API KEY to GET data
var APIKey = '9773795b91f45a7a1a6e86d5ff0d4d2e'

// local variables
var data = ''
var weatherData = ''
var cityName  = ''
var currentTemperature = ''
var feelsLike = ''
var response

// QUERY SELECTORS
var locaTime = document.querySelector('.local-time')
var inputCity = document.querySelector('.inputLocation')
var searchButton = document.querySelector('.btn')
var currentTemperatureElement = document.querySelector('.main-temp')
var feelsLikeElement = document.querySelector('.real')
var mode = document.querySelector('input[name="checkbox"]')


// EVENT LISTENERS
// switched mode :day/night 
mode.addEventListener('click',()=>{
    toggleMode()
});
// input event listener
inputCity.addEventListener('keypress',(e)=>{
    if(e.key === 'Enter'){
        requestHandler()
    }
})
// search button event listener
searchButton.addEventListener('click', requestHandler)


// EVENT HANDLERS
async function requestHandler(){
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

    // WOTHOUT USING ASYNC AWAIT
    // fetch(url).then(res => {
        //     if(res.ok){
        //         console.log('SUCCESS')
        //         return res.json()
        //     }else{
        //         alert('City Not Found!')
        //         console.log('NOT SUCCESS')
        //     }
        //     })
        // .then(data => displayTemp(data))

    // res.json() Returns Another Promise
    // USING ASYNC-AWAIT
    try{
        response = await fetch(url)
        // console.log(response)
        if(response.status === 200){
            console.log('SUCCESS')
            data = await response.json()
            displayTemp(data)
            console.log(data)
        }
        else{
            console.log('BAD REQUEST')
            return alert('Uh Oh... City Not Found :(')
        }
    }
    catch(err){
        console.log(err)
    }
}


// FUNCTIONS
function displayTemp(data){
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
// Switch Mode
function toggleMode(){
    document.body.classList.toggle('theme-night')

    document.querySelector('.mode').classList.toggle('night-text')
    document.querySelector('.local-time').classList.toggle('night-text')
    document.querySelector('.main-temp').classList.toggle('night-text')
    document.querySelector('.real').classList.toggle('night-text')
    document.querySelector('.footer').classList.toggle('night-text')
}
// Display Local Time
setInterval(()=>{
    var time = new Date()
    time = time.toLocaleTimeString()
    locaTime.textContent = time
},1000)
