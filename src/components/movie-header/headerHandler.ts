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
  $("#logo").addEventListener("click", function resetApp() {
    store.resetMoviesAndPages();
    store.setLastKeyword("");

    updateMovies();
  })
};

export const onClickSearchFormTrigger = () => {
  $("#search-form-trigger").addEventListener("click", function openSearchForm() {
    $('#logo').classList.add('display-none');
    $('#search-form-trigger').remove();
    ($('#search-box') as HTMLElement).style.width = '100%';
    ($('#search-form') as HTMLElement).style.display = 'flex';
    ($('#search-form') as HTMLElement).style.width = '100%';
    ($('#search-input') as HTMLElement).style.width = '100%';
  })
}

export const onClickSearchButton = () => {
  $('#search-button').addEventListener('click', function submitKeyword() {
    searchMoviesAndResetHeader();
  });
}

export const searchInputEnterListener = () => {
  const input = $('#search-input') as HTMLInputElement;
  input.addEventListener("keydown", function submitKeyword(event) {
    if (event.key === "Enter") {
      searchMoviesAndResetHeader();
    }
  })
}

const searchMoviesAndResetHeader = () => {
  const keyword = readSearchInputKeyword();
  searchMovieByKeyword(keyword);
  $('#movie-header').innerHTML = '<movie-header></movie-header>';
}
