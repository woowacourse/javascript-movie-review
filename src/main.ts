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

    // 엔터키 이벤트
    const input = document.querySelector(".search-bar") as HTMLInputElement;
    input.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const searchBar = document.querySelector(
          ".search-bar",
        ) as HTMLInputElement;

        const searchBarText = searchBar.value;
        const background = document.querySelector(
          ".background-container",
        ) as HTMLElement;
        background.hidden = true;

        let URL;

        let response;
        let data;
        let movieList;

        if (searchBarText === "") {
          background.hidden = false;
          pageNum = 1;
          movieDisplay.replaceChildren();

          URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR&page=${pageNum}`;
          response = await fetch(URL);
          data = await response.json();

          movieList = data.results;
        } else {
          movieDisplay.replaceChildren();
          URL = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(searchBarText)}&language=ko-KR`;
          response = await fetch(URL);
          data = await response.json();

          movieList = data.results;

          const description = document.querySelector("h2") as HTMLElement;
          description.textContent = `'${searchBarText}' 검색 결과`;

          // 검색 결과가 없을 때
          const searchError = document.querySelector(
            ".search-error-container",
          ) as HTMLElement;

          if (movieList.length === 0) {
            searchError.hidden = false;
          } else {
            searchError.hidden = true;
          }
        }

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
                <span class="vote-average"
                  >${movie.vote_average.toFixed(1)}</span
                >
              </p>
              <strong>${movie.title}</strong>
            </div>
          </div>`;

          movieDisplay.appendChild(li);
        });
      }
    });

    // 더 보기 버튼
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

    // 검색 버튼 '클릭'
    const searchBtn = document.querySelector(".search-btn");
    searchBtn?.addEventListener("click", async () => {
      const searchBar = document.querySelector(
        ".search-bar",
      ) as HTMLInputElement;

      const searchBarText = searchBar.value;
      const background = document.querySelector(
        ".background-container",
      ) as HTMLElement;
      background.hidden = true;

      let URL;

      let response;
      let data;
      let movieList;

      const description = document.querySelector("h2") as HTMLElement;

      if (searchBarText === "") {
        background.hidden = false;
        pageNum = 1;
        movieDisplay.replaceChildren();

        URL = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=ko-KR&page=${pageNum}`;
        response = await fetch(URL);
        data = await response.json();

        movieList = data.results;

        description.textContent = "지금 인기 있는 영화";
      } else {
        movieDisplay.replaceChildren();
        URL = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(searchBarText)}&language=ko-KR`;
        response = await fetch(URL);
        data = await response.json();

        movieList = data.results;

        description.textContent = `'${searchBarText}' 검색 결과`;

        // 검색 결과가 없을 때
        const searchError = document.querySelector(
          ".search-error-container",
        ) as HTMLElement;

        if (movieList.length === 0) {
          searchError.hidden = false;
        } else {
          searchError.hidden = true;
        }
      }

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
