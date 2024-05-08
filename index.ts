const jokeElement = document.getElementById("joke") as HTMLElement;
const jokeBtn = document.getElementById("next-joke") as HTMLElement;
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
