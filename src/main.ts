import { MovieResponse } from "../types/movie";
import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import Caption from "./components/movie/Caption.ts";
import LoadMoreButton from "./components/movie/LoadMoreButton.ts";
import NoSearchResults from "./components/movie/NoSearchResults.ts";
import SkeletonMovieItem from "./components/movie/SkeletonMovieItem.ts";
import { fetchPopularMovieList } from "./utils/api.ts";
import { $ } from "./utils/dom.ts";
import { loadMovies } from "./utils/loadMovies.ts";

let currentPage = 1;

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const FAIL_TO_LOAD_MOVIES = "영화 목록을 가져오지 못했습니다.";
const CAPTION = "지금 인기 있는 영화";

addEventListener("load", async () => {
  const app = $("#app");
  if (!app) return;

  const movieList = document.createElement("ul");
  movieList.classList.add("thumbnail-list");

  const wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrap");

  const initialHeader = Header({
    title: "로딩중 ...",
    imageUrl: "",
    voteAverage: 0,
  });

  if (!initialHeader) return;
  wrapper.appendChild(initialHeader);

  app.appendChild(wrapper);

  renderMovieContainer(wrapper, movieList);
  updateMovieContainer(wrapper, initialHeader);

  const footer = Footer();
  app.appendChild(footer);
});

const renderMovieContainer = (
  wrapper: HTMLDivElement,
  movieList: HTMLUListElement
) => {
  wrapper.appendChild(Caption({ title: CAPTION }));
  wrapper.appendChild(movieList);

  for (let i = 0; i < 20; i++) {
    const skeletonItem = SkeletonMovieItem();
    movieList.appendChild(skeletonItem);
  }
  wrapper.appendChild(movieList);
};

const updateMovieContainer = async (
  wrapper: HTMLDivElement,
  initialHeader: HTMLElement
) => {
  try {
    const movies: MovieResponse = await fetchPopularMovieList(currentPage);

    updateTopMovieInfo(movies, wrapper, initialHeader);
    loadMovies(movies);

    wrapper.appendChild(
      LoadMoreButton({
        loadFn: fetchPopularMovieList,
      })
    );
  } catch (error) {
    wrapper.appendChild(NoSearchResults(FAIL_TO_LOAD_MOVIES));
  }
};

const updateTopMovieInfo = (
  movies: MovieResponse,
  wrapper: HTMLDivElement,
  initialHeader: HTMLElement
) => {
  const topMovie = movies.results[0];

  if (topMovie) {
    const updatedHeader = Header({
      title: topMovie.title,
      imageUrl: `${IMG_BASE_URL}${topMovie.poster_path}`,
      voteAverage: topMovie.vote_average,
    });

    if (updatedHeader && initialHeader)
      wrapper.replaceChild(updatedHeader, initialHeader);
  }
};
