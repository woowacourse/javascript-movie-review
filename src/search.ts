import { baseUrl } from "./constants/env";
import { loadSearchMovies } from "./movieLoader";
import { navigate } from "./utils/router";

export const handleSearch = () => {
  const searchInput = document.querySelector<HTMLInputElement>("#search-input");
  if (!searchInput) return;

  const search = searchInput.value || "";
  if (!search.length) {
    searchInput.focus();
    return;
  }

  const searchUrl = new URL(baseUrl, window.location.origin);
  searchUrl.searchParams.set("search", search);
  navigate(`${searchUrl.pathname}${searchUrl.search}`);

  loadSearchMovies({ reset: true });
};
