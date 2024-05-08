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
const options = {
    headers: {
        Accept: "application/json",
    },
};
let jokeReport = [];
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
