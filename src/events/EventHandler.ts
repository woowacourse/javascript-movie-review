import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Modal from "../components/layout/Modal";
import MovieRenderer from "../domains/MovieRenderer";
import { getGenreList } from "../domains/movieHelpers";
import UserMovieRatingStorage from "../storages/UserMovieRatingStorage";
import { store } from "../stores";
import EventBus from "./EventBus";
import { EVENT_TYPES, EventPayloadType } from "./types/eventTypes";

const eventBus = EventBus.getInstance();

export function initializeEventHandler() {
  eventBus.on(EVENT_TYPES.modal.open, handleModalOpen);
  eventBus.on(EVENT_TYPES.modal.close, handleModalClose);
  eventBus.on(EVENT_TYPES.search.submit, handleSearch);
  eventBus.on(EVENT_TYPES.movie.setRating, handleSetRating);
}

async function handleModalOpen(movieId: EventPayloadType["MODAL_OPEN"]) {
  const modal = Modal.getInstance();

  modal.setState({ isLoading: true });
  modal.open();

  const movieData = store.movies.find((m) => m.id === movieId);
  if (!movieData) return;

  await getGenreList();

  const {
    genre_ids,
    title,
    poster_path,
    vote_average,
    overview,
    release_date,
  } = movieData;

  const genres = store.genres
    .filter(({ id }) => genre_ids.includes(id))
    .map(({ name }) => name);
  const releaseDate = release_date.split("-")[0];

  const ratings = UserMovieRatingStorage.getInstance().getRatings();
  const myRate = ratings.find((r) => r.movieId === movieId)?.rate ?? 0;

  const finalMovieData = {
    id: movieId,
    title,
    poster_path,
    vote_average,
    overview,
    genres: genres,
    release_date: releaseDate,
    isLoading: false,
    my_rate: myRate,
  };

  modal.open(finalMovieData);
}

function handleModalClose() {
  Modal.getInstance().close();
}

async function handleSearch(value: EventPayloadType["SEARCH_SUBMIT"]) {
  store.searchKeyword = value;
  store.page = 1;
  store.movies = [];

  const main = Main.getInstance();
  main.setState({
    title: `"${store.searchKeyword}" 검색 결과`,
    isLoading: true,
  });

  Header.getInstance().setState({ hasSearched: true });
  await MovieRenderer.getInstance().renderMovies();
}

function handleSetRating(newRating: EventPayloadType["SET_RATING"]) {
  const currentMovieId = Modal.getInstance().getMovieId();
  if (!currentMovieId) return;

  UserMovieRatingStorage.getInstance().setRating({
    movieId: currentMovieId,
    rate: newRating,
  });

  Modal.getInstance().setState({ my_rate: newRating });
}
