import { getSearchFormElement } from "../domain/movieElement";
import { addEventListenerToElement } from "../utils/eventListener";

export const setupSearchInteraction = (onSearch: (query: string) => void) => {
  const searchForm = getSearchFormElement();

  addEventListenerToElement({
    element: searchForm,
    event: "submit",
    handler: (event) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const input = form.querySelector<HTMLInputElement>("input"); //TODO: 계층화 필요
      if (input) {
        onSearch(input.value);
      }
    },
  });
};
