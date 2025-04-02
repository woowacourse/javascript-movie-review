import { Response } from "../types/response";
import { fetchPopularMovieList } from "./api/fetchPopularMovieList.ts";
import Modal from "./components/common/Modal.ts";
import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import Caption from "./components/movie/Caption.ts";
import LoadMoreSection from "./components/movie/LoadMoreSection.ts";
import MovieList from "./components/movie/MovieList.ts";
import NoSearchResults from "./components/movie/NoSearchResults.ts";
import hideSkeleton from "./components/utils/hideSkeleton.ts";
import loadDetailMovie from "./components/utils/loadDetailMovie.ts";
import showSkeleton from "./components/utils/showSkeleton.ts";
import observeLoadMore from "./domain/observeLoadMore.ts";
import { createElement } from "./utils/createElement.ts";
import { $ } from "./utils/dom.ts";

const INITIAL_PAGE = 1;

addEventListener("load", async () => {
  const app = $("#app");

  if (app) {
    const { header, movieList, footer } = createLayout();

    const wrapper = $("#wrap");

    wrapper.appendChild(header);
    wrapper.appendChild(Caption({ title: "지금 인기 있는 영화" }));
    wrapper.appendChild(movieList);

    processMovies();

    app.appendChild(Modal());

    const url = new URL(location.href);
    const movieId = url.searchParams.get("movieID");
    if (movieId) {
      loadDetailMovie(parseInt(movieId));
    }

    app.appendChild(footer);
  }
});

// 이런 것들은 어디에 위치해야하는가?
// components 내의 utils ??
function createLayout() {
  const header = Header({
    id: 0,
    title: "로딩중 ...",
    imageUrl: "",
    voteAverage: 0,
  });
  const movieList = createElement(/*html*/ `<ul class="thumbnail-list"></ul>`);
  const footer = Footer();

  return { header, movieList, footer };
}

async function processMovies() {
  const wrapper = $("#wrap");
  showSkeleton();
  const movies: Response = await fetchPopularMovieList(INITIAL_PAGE);

  if (movies.status === "fail") {
    wrapper.appendChild(NoSearchResults("영화 목록을 가져오지 못했습니다."));
    return;
  }

  const topMovie = movies.data.results[0];

  const updatedHeader = Header({
    id: topMovie.id,
    title: topMovie.title,
    imageUrl: `https://image.tmdb.org/t/p/w500${topMovie.poster_path}`,
    voteAverage: topMovie.vote_average,
  });

  if (updatedHeader) wrapper.replaceChild(updatedHeader, $("header"));

  MovieList(movies.data);

  wrapper.appendChild(LoadMoreSection());

  hideSkeleton();

  observeLoadMore({ loadFn: fetchPopularMovieList });
}
