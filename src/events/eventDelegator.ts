import Modal from "../components/layout/Modal";
import EventBus from "./EventBus";
import { isElement } from "./guards";
import { EVENT_TYPES } from "./types";

const eventBus = EventBus.getInstance();

const SELECTORS = {
  showMore: ".show-more",
  modalClose: "#closeModal",
  movieItem: ".thumbnail-list .item, .top-rated-movie",
  searchForm: ".top-rated-search",
  searchInput: ".top-rated-search-input",
};

window.addEventListener("click", async (event) => {
  const { target } = event;
  if (!isElement(target)) return;

  if (target.closest(SELECTORS.showMore)) {
    eventBus.emit(EVENT_TYPES.showMore);
    return;
  }

  if (target.closest(SELECTORS.modalClose)) {
    eventBus.emit(EVENT_TYPES.modalClose);
    return;
  }

  const movieItem = target.closest(SELECTORS.movieItem);
  if (movieItem) {
    const movieId = Number((movieItem as HTMLElement).dataset.movieId);
    if (movieId) {
      eventBus.emit(EVENT_TYPES.modalOpen, movieId);
      return;
    }
  }
});

window.addEventListener("submit", async (event) => {
  event.preventDefault();
  const { target } = event;
  if (!isElement(target)) return;

  if (target.closest(SELECTORS.searchForm)) {
    const $searchInput = target.querySelector(
      SELECTORS.searchInput
    ) as HTMLInputElement;
    const keyword = $searchInput?.value;
    if (!keyword) return;

    (target as HTMLFormElement).reset();
    eventBus.emit(EVENT_TYPES.search, keyword);
    return;
  }
});

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) return;

  if (["Escape", "Esc"].includes(event.key) && Modal.getInstance().isActive()) {
    eventBus.emit(EVENT_TYPES.modalClose);
    event.preventDefault();
  }
});
