import { ratingType } from "../../components/layout/Modal";

export const EVENT_TYPES = {
  modal: {
    open: "MODAL_OPEN",
    close: "MODAL_CLOSE",
  },
  search: {
    submit: "SEARCH_SUBMIT",
  },
  movie: {
    setRating: "SET_RATING",
  },
} as const;

export type EventTypes =
  | typeof EVENT_TYPES.modal.open
  | typeof EVENT_TYPES.modal.close
  | typeof EVENT_TYPES.search.submit
  | typeof EVENT_TYPES.movie.setRating;

export interface EventPayloadType {
  [EVENT_TYPES.modal.open]: number;
  [EVENT_TYPES.modal.close]: void;
  [EVENT_TYPES.search.submit]: string;
  [EVENT_TYPES.movie.setRating]: ratingType;
}
