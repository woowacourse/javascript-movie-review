import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Modal from "../components/layout/Modal";
import Genres from "../domains/entities/Genres";
import Movies from "../domains/entities/Movies";
import Pagination from "../domains/entities/Pagination";
import Search from "../domains/entities/Search";
import MovieRenderer from "../domains/MovieRenderer";
import UserMovieRatingStorage from "../storages/UserMovieRatingStorage";
import EventBus from "./EventBus";
import { EVENT_TYPES, EventPayloadType } from "./types/eventTypes";

const eventBus = EventBus.getInstance();
const movieRating = UserMovieRatingStorage.getInstance();
const movieRenderer = MovieRenderer.getInstance();

const modal = Modal.getInstance();
const header = Header.getInstance();
const main = Main.getInstance();

const movies = Movies.getInstance();
const genres = Genres.getInstance();
const pagination = Pagination.getInstance();
const search = Search.getInstance();

export function initializeEventHandler() {
  eventBus.on(EVENT_TYPES.modal.open, handleModalOpen);
  eventBus.on(EVENT_TYPES.modal.close, handleModalClose);
  eventBus.on(EVENT_TYPES.search.submit, handleSearch);
  eventBus.on(EVENT_TYPES.movie.setRating, handleSetRating);
}

async function handleModalOpen(movieId: EventPayloadType["MODAL_OPEN"]) {
  modal.setState({ isLoading: true });
  modal.open();

  const movieData = movies.movies.find((m) => m.id === movieId);
  if (!movieData) return;

  await genres.setGenres();

  const {
    genre_ids,
    title,
    poster_path,
    vote_average,
    overview,
    release_date,
  } = movieData;

  const genreNames = genres.getGenreNamesByIds(genre_ids);
  const releaseDate = release_date.split("-")[0];
  const ratings = movieRating.getRatings();
  const myRate = ratings.find((r) => r.movieId === movieId)?.rate ?? 0;

  const finalMovieData = {
    id: movieId,
    title,
    poster_path,
    vote_average,
    overview,
    genres: genreNames,
    release_date: releaseDate,
    isLoading: false,
    my_rate: myRate,
  };

  modal.open(finalMovieData);
}

function handleModalClose() {
  modal.close();
}

async function handleSearch(value: EventPayloadType["SEARCH_SUBMIT"]) {
  search.updateSearchKeyword(value);
  pagination.resetCurrentPage();
  movies.reset();

  main.setState({
    title: `"${search.searchKeyword}" 검색 결과`,
    isLoading: true,
  });

  header.setState({ hasSearched: true });
  await movieRenderer.renderMovies();
}

function handleSetRating(newRating: EventPayloadType["SET_RATING"]) {
  const currentMovieId = modal.getMovieId();
  if (!currentMovieId) return;

  movieRating.setRating({
    movieId: currentMovieId,
    rate: newRating,
  });

  modal.setState({ my_rate: newRating });
}
