const jokeElement = document.getElementById("joke") as HTMLElement;
const jokeBtn = document.getElementById("next-joke") as HTMLElement;
const options = {
  headers: {
    Accept: "application/json",
  },
};

const fetchJoke = () => {
  fetch("https://icanhazdadjoke.com/", options)
    .then((res) => res.json())
    .then((data) => {
      jokeElement.innerHTML = data.joke;
    });
};

fetchJoke();

jokeBtn.addEventListener("click", () => {
  fetchJoke();
});
