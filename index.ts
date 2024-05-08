const jokeElement = document.getElementById("joke") as HTMLElement;
const jokeBtn = document.getElementById("next-joke") as HTMLElement;
const weatherInfo = document.getElementById("weather-info") as HTMLElement;
const options = {
  headers: {
    Accept: "application/json",
  },
};

let jokeReport: {
  joke: string;
  score: 1 | 2 | 3;
  date: string;
}[] = [];

const kelvinToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(2);
};

const fetchWeather = async () => {
  try {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=41.38&lon=2.16&appid=afdb717c5e16706af6a787517e123666"
    );
    const data = await res.json();
    console.log(data.main.temp);
    const infoText = `${kelvinToCelsius(data.main.temp)}°C - Humidity: ${
      data.main.humidity
    }%`;
    const info = document.createTextNode(infoText);
    weatherInfo.appendChild(info);
  } catch {}
};

fetchWeather();

const fetchJoke = async () => {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", options);
    const data = await res.json();
    jokeElement.innerHTML = data.joke;
  } catch (error) {
    jokeElement.innerHTML = "Oops! Couldn't find any joke...";
  }
};

fetchJoke();

jokeBtn.addEventListener("click", () => {
  fetchJoke();
});

const addScore = (score: 1 | 2 | 3) => {
  const joke = jokeElement.innerHTML;
  const date = new Date().toISOString();
  const jokeIndex = jokeReport.findIndex((report) => report.joke === joke);

  if (jokeIndex !== -1) {
    jokeReport[jokeIndex].score = score;
    jokeReport[jokeIndex].date = date;
  } else {
    jokeReport.push({ joke, score, date });
  }
  console.log(jokeReport);
};
