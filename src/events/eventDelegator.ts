import Modal, { ratingType } from "../components/layout/Modal";
import EventBus from "./EventBus";
import { isElement, isForm, isHTMLElement, isImage, isInput } from "./guards";
import { EVENT_TYPES } from "./types";

const eventBus = EventBus.getInstance();

const SELECTORS = {
  modalClose: "#closeModal",
  movieItem: ".thumbnail-list .item, .top-rated-button",
  searchForm: ".top-rated-search",
  searchInput: ".top-rated-search-input",
  ratingStar: ".star",
};

window.addEventListener("click", async (event) => {
  const { target } = event;
  if (!isElement(target)) return;

  const elementMap = [
    {
      selector: SELECTORS.modalClose,
      action: () => eventBus.emit(EVENT_TYPES.modalClose),
    },
    {
      selector: SELECTORS.movieItem,
      action: (movieItem: Element | null) => {
        if (!movieItem || !isHTMLElement(movieItem)) return;

        const movieId = Number(movieItem.dataset.movieId);
        if (!movieId) return;

        eventBus.emit(EVENT_TYPES.modalOpen, movieId);
      },
    },
    {
      selector: SELECTORS.ratingStar,
      action: (starImg: Element | null) => {
        if (!starImg || !isImage(starImg)) return;
        const newRating = Number(starImg.dataset.value) as ratingType;

        eventBus.emit(EVENT_TYPES.setRating, newRating);
      },
    },
  ];

  for (const { selector, action } of elementMap) {
    const element = target.closest(selector);
    if (!element) continue;
    action(element);
    return;
  }
});

window.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { target } = event;
  if (!isForm(target)) return;

  const $searchInput = target.querySelector(SELECTORS.searchInput);
  if (!isInput($searchInput)) return;

  const keyword = $searchInput.value.trim();
  if (!keyword) return;

  target.reset();
  eventBus.emit(EVENT_TYPES.search, keyword);
});

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) return;

  if (["Escape", "Esc"].includes(event.key) && Modal.getInstance().isActive()) {
    eventBus.emit(EVENT_TYPES.modalClose);
    event.preventDefault();
  }
});
