import { $ } from '../utils/common';
import './SearchInput.css';

class SearchInput extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setSubmitEvent();
  }

  render() {
    this.innerHTML = `
    <form id="search-form-box" class="search-box">
      <input id="search-input-tag" type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </form>
    `;
  }

  setSubmitEvent() {
    $('#search-form-box').addEventListener('submit', event => {
      event.preventDefault();
      const word = $('#search-input-tag').value;

      $('movies-container').setSearchWord(word);
      $('#search-input-tag').value = '';
    });
  }
}

export default SearchInput;
