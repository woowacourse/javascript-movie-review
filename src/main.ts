import image from "../templates/images/star_filled.png";
import { fetchMovies } from "./features/fetchMovies";
import MovieList from "./features/UI/MovieCard";

let page: number = 1;

// 렌더링 시 더보기 버튼
const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
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
