const jokeElement = document.getElementById("joke") as HTMLElement;
const jokeBtn = document.getElementById("next-joke") as HTMLElement;
const weatherInfo = document.getElementById("weather-info") as HTMLElement;
const weatherIcon = document.getElementById("weather-icon") as HTMLElement;
const weatherContainer = document.getElementById(
  "weather-container"
) as HTMLElement;
const main = document.getElementsByClassName("main");
const backgroundLeft = document.getElementById(
  "background-left"
) as HTMLElement;
const backgroundCenter = document.getElementById(
  "background-center"
) as HTMLElement;
const backgroundRight = document.getElementById(
  "background-right"
) as HTMLElement;

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
  return (kelvin - 273.15).toFixed(1);
};

const fetchWeather = async (): Promise<void> => {
  try {
    const res = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=41.38&lon=2.16&appid=afdb717c5e16706af6a787517e123666"
    );
    const data = await res.json();
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute("src", icon);
    const infoText = `${kelvinToCelsius(data.main.temp)}°C`;
    const info = document.createTextNode(infoText);
    weatherContainer.appendChild(weatherIcon);
    weatherInfo.appendChild(info);
  } catch (error) {
    console.error("We couldn't fetch the weather because", error);
  }
};

fetchWeather();

const fetchJoke = async (): Promise<void> => {
  let randomNum = Math.floor(Math.random() * 101);
  let apiUrl;
  let fetchOptions = {};

  if (randomNum % 2 === 0) {
    apiUrl = "https://icanhazdadjoke.com/";
    fetchOptions = options;
  } else {
    apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
  }

  try {
    const res = await fetch(apiUrl, fetchOptions);
    const data = await res.json();
    jokeElement.innerHTML = data.joke;
    setBackground();
  } catch (error) {
    console.error("We couldn't fetch the joke because", error);
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

let count = 1;

const setBackground = () => {
  backgroundCenter.setAttribute("src", `/assets/blob${count}a.svg`);
  backgroundLeft.setAttribute("src", `/assets/blob${count}b.svg`);
  backgroundRight.setAttribute("src", `/assets/blob${count}c.svg`);
  count = (count % 3) + 1;
};
