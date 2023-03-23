import { $ } from '../utils/common';
import { MovieConatainerInformation } from './MoviesContainer';
import './SearchInput.css';

class SearchInput extends HTMLElement {
  connectedCallback(): void {
    this.render();
    this.setSubmitEvent();
  }

  render(): void {
    this.innerHTML = /*html*/ `
    <label for="search-input-tag">
      <form id="search-form-box" class="search-box"> 
      <input id="search-input-tag" type="text" required maxlength=50 placeholder="검색" />
      <button class="search-button">검색</button>
      </form>
    </label>
    `;
  }

  setSubmitEvent(): void {
    $('#search-form-box')?.addEventListener('submit', event => {
      event.preventDefault();
      const searchInputTag = $('#search-input-tag') as HTMLInputElement;
      const movieContainer = $('movies-container') as MovieConatainerInformation;

      const word = searchInputTag.value.trim();
      if (word === '') return;

      movieContainer.setSearchWord(word);
      searchInputTag.value = '';
      searchInputTag.blur();
    });
  }
}

export default SearchInput;
