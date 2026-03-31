import image from "../templates/images/star_filled.png";
import modal from "../templates/modal.html?raw";
import "../templates/styles/index.css";

addEventListener("load", async () => {
  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
    app.innerHTML = modal;

    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR`;
    const response = await fetch(URL);
    const data = await response.json();
  }
});
