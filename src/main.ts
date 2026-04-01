import image from "../templates/images/star_filled.png";
import { fetchMovies } from "./features/fetchMovies";
import MovieList from "./features/UI/MovieCard";
import { Header } from "./features/UI/Header";

let page: number = 1;

// 렌더링 시 더보기 버튼
const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
  const data = await fetchMovies("movie/popular", page);
  Header.render(data.results[0]);

  const app = document.querySelector("#app");
  const buttonImage = document.createElement("img");
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
  }

  // fetchAPI를 불러와서 MovieList 생성자를 만들고, 불러오면 끝
  fetchApi();
});

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  page += 1;
  fetchApi();
  // const fetchMovie = await fetchMovies("movie/popular", page);
});

async function fetchApi() {
  const MovieListInstance = new MovieList();
  const data = await fetchMovies("movie/popular", page);

  MovieListInstance.renderMovieList(data);

  if (data.total_pages === page) {
    moreButton.style.display = "none";
  } else moreButton.style.display = "block";
}

// 검색

const btnSubmit = document.querySelector(".btn-submit") as HTMLButtonElement;

btnSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  page = 1;
  const searchInput = document.querySelector(
    ".search-input",
  ) as HTMLInputElement;
  const searchMovie = searchInput.value.trim();

  if (searchMovie === "") {
    const MovieListInstance = new MovieList();
    MovieListInstance.movieList!.innerHTML = "";
    const data = await fetchMovies("movie/popular", page);
    MovieListInstance.renderMovieList(data);

    const mainTitle = document.querySelector(".main-title") as HTMLElement;
    mainTitle.textContent = "지금 인기 있는 영화";

    if (data.total_pages === page) {
      moreButton.style.display = "none";
    } else moreButton.style.display = "block";
    return;
  }

  const MovieListInstance = new MovieList();

  const data = await fetchMovies("search/movie", page, searchMovie);
  MovieListInstance.movieList!.innerHTML = "";
  MovieListInstance.renderMovieList(data);

  const mainTitle = document.querySelector(".main-title") as HTMLElement;
  mainTitle.textContent = `"${searchMovie}" 검색 결과`;

  if (data.results.length === 0) {
    MovieListInstance.movieList!.innerHTML = "<p>검색 결과가 없습니다.</p>";
  }

  if (data.total_pages === page) {
    moreButton.style.display = "none";
  } else moreButton.style.display = "block";
});
