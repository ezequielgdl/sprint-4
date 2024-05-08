"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jokeElement = document.getElementById("joke");
const jokeBtn = document.getElementById("next-joke");
const weatherInfo = document.getElementById("weather-info");
const options = {
    headers: {
        Accept: "application/json",
    },
};
let jokeReport = [];
const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
};
const fetchWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.38&lon=2.16&appid=afdb717c5e16706af6a787517e123666");
        const data = yield res.json();
        console.log(data.main.temp);
        const infoText = `${kelvinToCelsius(data.main.temp)}°C - Humidity: ${data.main.humidity}%`;
        const info = document.createTextNode(infoText);
        weatherInfo.appendChild(info);
    }
    catch (_a) { }
});
fetchWeather();
const fetchJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://icanhazdadjoke.com/", options);
        const data = yield res.json();
        jokeElement.innerHTML = data.joke;
    }
    catch (error) {
        jokeElement.innerHTML = "Oops! Couldn't find any joke...";
    }
});
fetchJoke();
jokeBtn.addEventListener("click", () => {
    fetchJoke();
});
const addScore = (score) => {
    const joke = jokeElement.innerHTML;
    const date = new Date().toISOString();
    const jokeIndex = jokeReport.findIndex((report) => report.joke === joke);
    if (jokeIndex !== -1) {
        jokeReport[jokeIndex].score = score;
        jokeReport[jokeIndex].date = date;
    }
    else {
        jokeReport.push({ joke, score, date });
    }
    console.log(jokeReport);
};
