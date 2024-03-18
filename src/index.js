import "./resources.js";

////////////////

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;
const MOVIE_SEARCH_URL = `${BASE_URL}/search/movie`;

////////////////

async function fetchPopularMovies() {
  const popularMovieUrl =
    POPULAR_MOVIES_URL +
    "?" +
    new URLSearchParams({
      api_key: API_KEY,
      language: "ko-KR",
      page: 1,
    });

  const response = await fetch(popularMovieUrl);
  const popularMovies = await response.json();

  return popularMovies.results;
}

async function renderItems() {
  const generateTemplate = (item) => /*html*/ `
  <li>
    <a href="#">
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w220_and_h330_face/${
            item.poster_path
          }"
          loading="lazy"
          alt="${item.title}"
        />
        <p class="item-title">${item.title}</p>
        <p class="item-score">
          <img src="${"./images/star_filled.png"}" alt="별점" /> ${
    item.vote_average
  }
        </p>
      </div>
    </a>
  </li>
  `;

  const items = await fetchPopularMovies();
  const elements = items.map((item) => {
    const li = document.createElement("li");
    li.innerHTML = generateTemplate(item);
    return li;
  });
  elements.forEach((element) => {
    document.querySelector(".item-list").appendChild(element);
  });
}

renderItems();
