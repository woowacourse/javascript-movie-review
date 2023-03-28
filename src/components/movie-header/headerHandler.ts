import { searchMovieByKeyword, updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";
import { $ } from "../../utils/selector";
import Header from "./Header";

export const getHeaderInstance = () => {
  const header: Header = Header.getInstance();
  return header;
}

export const readSearchInputKeyword = () => {
  const input = $('#search-input') as HTMLInputElement;
  const keyword = input.value;
  return keyword;
}

export const onClickLogo = () => {
  const store: Store = Store.getInstance();
  $("#logo").addEventListener("click", () => {
    store.resetMoviesAndPages();
    store.setLastKeyword("");

    updateMovies();
  })
};

export const onClickSearchFormTrigger = () => {
  $("#search-form-trigger").addEventListener("click", () => {
    $('#logo').classList.add('display-none');
    $('#search-form-trigger').remove();
    ($('#search-box') as HTMLElement).style.width = '100%';
    ($('#search-form') as HTMLElement).style.width = '100%';
    ($('#search-input') as HTMLElement).style.width = '100%';
    ($('#search-form') as HTMLElement).style.display = 'flex';
  })
}

export const onClickSearchButton = () => {
  $('#search-button').addEventListener('click', () => {
    const keyword = readSearchInputKeyword();
    searchMovieByKeyword(keyword);
    getHeaderInstance().init();
  });
}

export const searchInputEnterListener = () => {
  const input = $('#search-input') as HTMLInputElement;
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const keyword = readSearchInputKeyword();
      searchMovieByKeyword(keyword);
      getHeaderInstance().init();
    }
  })
}

