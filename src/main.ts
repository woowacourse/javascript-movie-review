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
    let pageNum = 1;

    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR&page=${pageNum}`;
    const response = await fetch(URL);
    const data = await response.json();
    // console.log(data);

    const movieList = data.results;

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
    });

    const displayMoreBtn = document.querySelector(".display-more-btn");
    displayMoreBtn?.addEventListener("click", async () => {
      pageNum++;

      const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR&page=${pageNum}`;
      const response = await fetch(URL);
      const data = await response.json();

      const movieList = data.results;

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
      });
    });
  }
});
