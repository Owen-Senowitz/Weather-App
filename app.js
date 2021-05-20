const api = {
    key: "c47209ab9575ebebd612407d0f7d6588",
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.url}${query}&units=imperial&appid=${api.key}`)
    .then(weater => {
        return weater.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weatherType = document.querySelector('.current .weather');
    weatherType.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${weather.main.temp_max}°F / ${weather.main.temp_min}°F`
}

function dateBuilder(d) {
    const months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date} ${year}`;
}
