import { $ } from '../../utils/common';
import './SearchInput.css';

class SearchInput extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setSubmitEvent();
    this.setClickEvent();
  }

  render() {
    this.innerHTML = `
    <div class="input-container">
      <form class="search-box search-box-hide">
        <input type="text" placeholder="검색"/>
        <button class="search-button">검색</button>
      </form>
      <button class="search-single-button search-button-hide"></button>
    </div>
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

  setClickEvent() {
    $('.search-single-button').addEventListener('click', () => {
      $('.search-single-button').classList.add('search-click-hide');
      $('.search-box').classList.remove('search-box-hide');
    });
  }
}

customElements.define('search-input', SearchInput);

export default SearchInput;
