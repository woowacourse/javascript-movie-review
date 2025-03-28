import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Modal from "../components/layout/Modal";
import { getGenreList, updateMoviesList } from "../domains/renderMoviesList";
import UserMovieRatingStorage from "../storages/UserMovieRatingStorage";
import { store } from "../stores";
import EventBus from "./EventBus";
import { EVENT_TYPES } from "./types";

const eventBus = EventBus.getInstance();

eventBus.on(EVENT_TYPES.modalOpen, async (movieId) => {
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
    title,
    poster_path,
    vote_average,
    overview,
    genres: genres,
    release_date: releaseDate,
    isLoading: false,
    my_rate: myRate,
  };

  Modal.getInstance().open(finalMovieData);
});

eventBus.on(EVENT_TYPES.modalClose, () => {
  Modal.getInstance().close();
});

eventBus.on(EVENT_TYPES.showMore, async () => {
  store.page = store.page + 1;
  await updateMoviesList();
});

eventBus.on(EVENT_TYPES.search, async (value) => {
  store.searchKeyword = value;
  store.page = 1;
  store.movies = [];

  const main = Main.getInstance();
  main.setState({
    title: `"${store.searchKeyword}" 검색 결과`,
    isLoading: true,
  });

  Header.getInstance().setState({ hasSearched: true });
  await updateMoviesList();
});
