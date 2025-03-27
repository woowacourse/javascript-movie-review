import Header from "../components/layout/Header";
import Main from "../components/layout/Main";
import Modal from "../components/layout/Modal";
import { updateMoviesList } from "../domains/renderMoviesList";
import { store } from "../stores";
import EventBus from "./EventBus";
import { EVENT_TYPES } from "./types";

const eventBus = EventBus.getInstance();

eventBus.on(EVENT_TYPES.modalOpen, (movieId) => {
  const movieData = store.movies.find((m) => m.id === movieId);
  if (movieData) Modal.getInstance().open(movieData);
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
