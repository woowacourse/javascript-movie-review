const html = String.raw;

import image from "../templates/images/star_filled.png";
import modal from "../templates/modal.html?raw";
import "../templates/styles/index.css";
import star_empty from "../templates/images/star_empty.png";

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

    // 영화 하나 <div class="item">
    /*
      thumbnail, rate, title
    */
    const movieList = data.results;

    // document.querySelectorAll(".star").forEach((star) => {
    //   (star as HTMLImageElement).src = star_empty;
    // });

    const movieDisplay = document.querySelector(
      ".thumbnail-list",
    ) as HTMLUListElement;

    // 영화 20개
    movieList.forEach((movie: any) => {
      const li = document.createElement("li");

      li.innerHTML = html` <div class="item">
        <img
          class="thumbnail"
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          alt="인사이드 아웃 2"
        />
        <div class="item-desc">
          <p class="rate">
            <img class="star" src="${star_empty}" />
            <span class="vote-average">${movie.vote_average.toFixed(1)}</span>
          </p>
          <strong>${movie.title}</strong>
        </div>
      </div>`;

      movieDisplay.appendChild(li);

      // const thumnail = document.querySelector(".thumbnail") as HTMLImageElement;
      // thumnail.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      // const title = document.querySelector("strong") as HTMLElement;
      // title.textContent = movie.title;

      // const rate = document.querySelector(".vote-average") as HTMLElement;
      // rate.textContent = movie.vote_average;
    });
  }
});
