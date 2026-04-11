import { baseUrl } from "../constants/env";
import { loadSearchMovies } from "../movieLoader";
import { createSearchUrl, navigate } from "../utils/router";

export const handleSearchButtonClick = () => {
  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  if (!searchInput) return;

  const search = searchInput.value || "";
  if (!search.length) {
    searchInput.focus();
    return;
  }

  const url = createSearchUrl(baseUrl, search);
  navigate(url);
  loadSearchMovies({ reset: true });
};

export const handleSearchInputEnter = handleSearchButtonClick;
