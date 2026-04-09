import { getSearchFormElement, getSearchInputElement } from "../domain/movieElement";
import { addEventListenerToElement } from "../utils/eventListener";

export const setupSearchInteraction = (onSearch: (query: string) => void) => {
  const searchForm = getSearchFormElement();

  addEventListenerToElement({
    element: searchForm,
    event: "submit",
    handler: (event) => {
      event.preventDefault();
      const input = getSearchInputElement();
      if (input) {
        onSearch((input as HTMLInputElement).value);
      }
    },
  });
};
