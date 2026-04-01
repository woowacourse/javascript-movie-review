import { fetchMovies } from "./features/fetchMovies";
import MovieList from "./features/UI/MovieList";
import { Header } from "./features/UI/Header";

let page: number = 1;

// 렌더링 시 더보기 버튼
const moreButton = document.querySelector(".btn-more") as HTMLButtonElement;

addEventListener("load", async () => {
  const data = await fetchMovies("movie/popular", page);
  Header.render(data.results[0]);

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
      MovieListInstance.movieContainer!.innerHTML = "";
      MovieListInstance.renderSkeleton();
      const data = await fetchMovies("movie/popular", page);
      MovieListInstance.renderMovieList(data);

      const mainTitle = document.querySelector(".main-title") as HTMLElement;
      mainTitle.textContent = "지금 인기 있는 영화";

      if (data.total_pages === page) {
        moreButton.style.display = "none";
      } else {
        moreButton.style.display = "block";
      }
      return;
    }

    const MovieListInstance = new MovieList();
    const data = await fetchMovies("search/movie", page, searchMovie);
    MovieListInstance.movieList!.innerHTML = "";
    MovieListInstance.movieContainer!.innerHTML = "";
    MovieListInstance.renderMovieList(data);

    const mainTitle = document.querySelector(".main-title") as HTMLElement;
    mainTitle.textContent = `"${searchMovie}" 검색 결과`;

    if (data.results.length === 0) {
      MovieListInstance.showEmpty();
    }

    if (data.total_pages === page) {
      moreButton.style.display = "none";
    } else {
      moreButton.style.display = "block";
    }
  });

  fetchApi();
});

// 더보기 버튼
moreButton.addEventListener("click", async () => {
  page += 1;
  fetchApi();
});

async function fetchApi() {
  const MovieListInstance = new MovieList();

  if (page === 1) {
    MovieListInstance.renderSkeleton();
  }

  const data = await fetchMovies("movie/popular", page);

  MovieListInstance.renderMovieList(data);

  if (data.total_pages === page) {
    moreButton.style.display = "none";
  } else {
    moreButton.style.display = "block";
  }
}
