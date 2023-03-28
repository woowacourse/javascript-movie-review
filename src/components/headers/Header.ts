import { updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";
import { $ } from "../../utils/selector";
import { searchMovieByKeyword } from "./headerHandler";

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.render();
    this.onClickLogo();
    this.onClickSearchFormTrigger();
    this.onClickSearchButton();
    this.searchInputEnterListener();
  }

  searchInputEnterListener() {
    const input = $('#search-input') as HTMLInputElement;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const keyword = this.readSearchInputKeyword();
        searchMovieByKeyword(keyword);
        this.init();
      }
    })
  }

  onClickLogo() {
    const store: Store = Store.getInstance();
    $("#logo").addEventListener("click", () => {
      store.resetMoviesAndPages();
      store.setLastKeyword("");

      updateMovies();
    })
  };

  onClickSearchButton() {
    $('#search-button').addEventListener('click', () => {
      const keyword = this.readSearchInputKeyword();
      searchMovieByKeyword(keyword);
      this.init();
    });
  }

  readSearchInputKeyword() {
    const input = $('#search-input') as HTMLInputElement;
    const keyword = input.value;
    return keyword;
  }

  onClickSearchFormTrigger() {
    $("#search-form-trigger").addEventListener("click", () => {
      $('#logo').classList.add('display-none');
      $('#search-form-trigger').remove();
      ($('#search-box') as HTMLElement).style.width = '100%';
      ($('#search-form') as HTMLElement).style.width = '100%';
      ($('#search-input') as HTMLElement).style.width = '100%';
      ($('#search-form') as HTMLElement).style.display = 'flex';
    })
  }

  render() {
    this.innerHTML = `
    <header id="header" class="d-flex justify-content-between">
      <div id="logo">
        <h1><img id="logo" src="./assets/logo.png" alt="MovieList 로고" /></h1>
      </div>
      
      <div id="search-box" class="search-box d-flex justify-content-between">
        <div id="search-form" class="search-box d-flex justify-content-between">
          <input
            id="search-input" 
            type="text" 
            placeholder="검색" 
            name="search-bar" 
            class=""
          />
          <button 
            id="search-button" 
            class="search-button"
          >
            검색
          </button>
        </div>
        <button id="search-form-trigger" class="search-button">검색</button>
      </div>
    </header>
    `;
  }

}
