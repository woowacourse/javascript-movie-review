import fetchMovieDetail from "./api/fetchMovieDetail";
import fetchPopularMovies from "./api/fetchPopularMovies";
import fetchSearchMovies from "./api/fetchSearchMovies";
import Header from "./components/Header/Header";
import SearchInput from "./components/Header/SearchInput";
import Modal from "./components/Modal/Modal";
import ModalDetail from "./components/Modal/ModalDetail/ModalDetail";
import ModalLoadingSpinner from "./components/Modal/ModalLoadingSpinner/ModalLoadingSpinner";
import MovieItem from "./components/MovieItem";
import MovieList from "./components/MovieList/MovieList";
import NoThumbnail from "./components/NoThumbnail/NoThumbnail";
import ScrollObserver from "./components/ScrollObserver/ScrollObserver";
import Skeleton from "./components/Skeleton/Skeleton";
import Subtitle from "./components/Subtitle/Subtitle";
import ErrorMessage from "./constants/ErrorMessage";
import { MOVIE_RATE_LIST_KEY } from "./constants/MovieRate";
import LocalStorage from "./utils/localStorage";

let pageNumber = 1;

addEventListener("load", async () => {
  try {
    if (!LocalStorage.getJSON(MOVIE_RATE_LIST_KEY))
      LocalStorage.setJSON(MOVIE_RATE_LIST_KEY, {});

    const { movies } = await getPopularMovieList();
    const observer = ScrollObserver.get();

    Modal.init();
    Header.init({
      id: movies[0].id,
      title: movies[0].title,
      posterPath: movies[0].backdropPath || "",
      rate: movies[0].rate,
    });
    Header.onDetailButtonClick = (e) => showMovieDetailModal(e);

    SearchInput.init();
    SearchInput.onButtonClick = () => search(observer);
    SearchInput.onEnterKeydown = () => search(observer);

    Subtitle.init();

    MovieList.init(movies);

    MovieItem.onClickItem = (e) => showMovieDetailModal(e);

    Skeleton.init();

    ScrollObserver.intersect = () => seeMorePopularMovies(observer);

    ScrollObserver.on(observer);
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
});

async function getPopularMovieList() {
  try {
    const movieList = await fetchPopularMovies(pageNumber);
    pageNumber += 1;
    if (!movieList) throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES);

    return movieList;
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return { movies: [], canMore: false };
  }
}

async function getSearchMovieList(query: string) {
  try {
    const movieList = await fetchSearchMovies(query, pageNumber);
    pageNumber += 1;
    if (!movieList) throw new Error(ErrorMessage.FETCH_POPULAR_MOVIES);

    return movieList;
  } catch (error) {
    if (error instanceof Error) alert(error.message);
    return { movies: [], canMore: false };
  }
}

async function seeMorePopularMovies(observer: IntersectionObserver) {
  Skeleton.show();
  ScrollObserver.on(observer);
  try {
    const { movies, canMore } = await getPopularMovieList();
    if (!canMore) ScrollObserver.off(observer);
    MovieList.add(movies);
    Skeleton.hidden();
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}

async function search(observer: IntersectionObserver) {
  Header.setSearchMode();
  NoThumbnail.hidden();
  MovieList.init([]);
  pageNumber = 1;
  ScrollObserver.on(observer);

  Skeleton.show();
  ScrollObserver.intersect = () => seeMoreSearchMovies(query, observer);
  const query = SearchInput.getSearchValue();
  try {
    const { movies, canMore } = await getSearchMovieList(query);
    Subtitle.set(`"${query}" 검색 결과`);
    Skeleton.hidden();
    MovieList.set(movies);
    if (!canMore) ScrollObserver.off(observer);

    if (movies.length === 0) {
      NoThumbnail.show();
      return;
    }
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}

async function seeMoreSearchMovies(
  query: string,
  observer: IntersectionObserver
) {
  Skeleton.show();
  try {
    const { movies, canMore } = await getSearchMovieList(query);
    if (!canMore) ScrollObserver.off(observer);
    MovieList.add(movies);
    Skeleton.hidden();
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}

async function showMovieDetailModal(e: MouseEvent) {
  const clickedMovieItem = e.currentTarget as HTMLElement;
  if (!clickedMovieItem.dataset.id) return;

  Modal.show();
  ModalLoadingSpinner.show();
  Modal.reset();
  try {
    const movieDetail = await fetchMovieDetail(clickedMovieItem.dataset.id);
    if (!movieDetail) throw new Error(ErrorMessage.FETCH_MOVIE_DETAIL);

    ModalLoadingSpinner.hidden();
    Modal.setContent(
      ModalDetail.create({
        id: movieDetail.id,
        posterPath: movieDetail.posterPath,
        category: movieDetail.category,
        title: movieDetail.title,
        releaseYear: movieDetail.releaseYear,
        rate: movieDetail.rate,
        detail: movieDetail.detail,
      })
    );
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
}
