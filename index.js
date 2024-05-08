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
const weatherIcon = document.getElementById("weather-icon");
const weatherContainer = document.getElementById("weather-container");
const main = document.getElementsByClassName("main");
const backgroundLeft = document.getElementById("background-left");
const backgroundCenter = document.getElementById("background-center");
const backgroundRight = document.getElementById("background-right");
const options = {
    headers: {
        Accept: "application/json",
    },
};
let jokeReport = [];
const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
};
const fetchWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.38&lon=2.16&appid=afdb717c5e16706af6a787517e123666");
        const data = yield res.json();
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIcon.setAttribute("src", icon);
        const infoText = `${kelvinToCelsius(data.main.temp)}°C`;
        const info = document.createTextNode(infoText);
        weatherContainer.appendChild(weatherIcon);
        weatherInfo.appendChild(info);
    }
    catch (error) {
        console.error("We couldn't fetch the weather because", error);
    }
});
fetchWeather();
const fetchJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    let randomNum = Math.floor(Math.random() * 101);
    let apiUrl;
    let fetchOptions = {};
    if (randomNum % 2 === 0) {
        apiUrl = "https://icanhazdadjoke.com/";
        fetchOptions = options;
    }
    else {
        apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    }
    try {
        const res = yield fetch(apiUrl, fetchOptions);
        const data = yield res.json();
        jokeElement.innerHTML = data.joke;
        setBackground();
    }
    catch (error) {
        console.error("We couldn't fetch the joke because", error);
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
let count = 1;
const setBackground = () => {
    backgroundCenter.setAttribute("src", `/assets/blob${count}a.svg`);
    backgroundLeft.setAttribute("src", `/assets/blob${count}b.svg`);
    backgroundRight.setAttribute("src", `/assets/blob${count}c.svg`);
    count = (count % 3) + 1;
};
