import { $ } from '../../utils/common';
import './SearchInput.css';

class SearchInput extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setSubmitEvent();
  }

  render() {
    this.innerHTML = `
    <form class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </form>
    `;
  }

  setSubmitEvent() {
    $('.search-box').addEventListener('submit', e => {
      e.preventDefault();
      const word = $('input').value;

      $('movie-list').setSearchWord(word);
      $('input').value = '';
    });
  }
}

export default SearchInput;
