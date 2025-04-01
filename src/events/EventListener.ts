import Modal, { ratingType } from "../components/layout/Modal";
import EventBus from "./EventBus";
import {
  isElement,
  isForm,
  isHTMLElement,
  isImage,
  isInput,
} from "./utils/guards";
import { EVENT_TYPES } from "./types/eventTypes";

const eventBus = EventBus.getInstance();

const SELECTORS = {
  closeModalButton: "#closeModal",
  modalBackground: ".modal-background",
  movieItem: ".thumbnail-list .item, .top-rated-button",
  searchForm: ".top-rated-search",
  searchInput: ".top-rated-search-input",
  ratingStar: ".star",
};

export function initializeDomEventListener() {
  window.addEventListener("click", handleClick);
  window.addEventListener("submit", handleSubmit);
  window.addEventListener("keydown", handleKeydown);
}

function handleClick({ target }: MouseEvent) {
  if (!isElement(target)) return;

  const elementMap = [
    {
      selector: SELECTORS.closeModalButton,
      action: () => eventBus.emit(EVENT_TYPES.modalClose),
      matchMethod: "closest",
    },
    {
      selector: SELECTORS.modalBackground,
      action: () => eventBus.emit(EVENT_TYPES.modalClose),
      matchMethod: "matches",
    },
    {
      selector: SELECTORS.movieItem,
      action: (movieItem: Element | null) => {
        if (!movieItem || !isHTMLElement(movieItem)) return;

        const movieId = Number(movieItem.dataset.movieId);
        if (!movieId) return;

        eventBus.emit(EVENT_TYPES.modalOpen, movieId);
      },
      matchMethod: "closest",
    },
    {
      selector: SELECTORS.ratingStar,
      action: (starImg: Element | null) => {
        if (!starImg || !isImage(starImg)) return;
        const newRating = Number(starImg.dataset.value) as ratingType;

        eventBus.emit(EVENT_TYPES.setRating, newRating);
      },
      matchMethod: "closest",
    },
  ];

  for (const { selector, action, matchMethod } of elementMap) {
    const element =
      matchMethod === "matches"
        ? target.matches(selector)
          ? target
          : null
        : target.closest(selector);

    if (!element) continue;
    action(element);
    return;
  }
}

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();

  const { target } = event;
  if (!isForm(target)) return;

  const $searchInput = target.querySelector(SELECTORS.searchInput);
  if (!isInput($searchInput)) return;

  const keyword = $searchInput.value.trim();
  if (!keyword) return;

  target.reset();
  eventBus.emit(EVENT_TYPES.search, keyword);
}

function handleKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return;

  if (["Escape", "Esc"].includes(event.key) && Modal.getInstance().isActive()) {
    eventBus.emit(EVENT_TYPES.modalClose);
    event.preventDefault();
  }
}
