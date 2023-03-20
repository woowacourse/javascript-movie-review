import { $ } from '../utils/common';
import './SearchInput.css';

class SearchInput extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setSubmitEvent();
  }

  render() {
    this.innerHTML = `
    <label for="search-input-tag">
      <form id="search-form-box" class="search-box"> 
      <input id="search-input-tag" type="text" placeholder="검색" />
      <button class="search-button">검색</button>
      </form>
    </label>
    `;
  }

  setSubmitEvent() {
    $('#search-form-box').addEventListener('submit', event => {
      event.preventDefault();

      const word = $('#search-input-tag').value.trim();
      if (word === '') return;

      $('movies-container').setSearchWord(word);
      $('#search-input-tag').value = '';
      $('#search-input-tag').blur();
    });
  }
}

export default SearchInput;
