import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { setEndpoint, setUrlParams } from '../../utils/queryString';
import '../SearchBox/SearchBox.css';
import Toast from '../Toast/Toast';
import searchIcon from '../../assets/search_button.png';

class searchInputBox {
  currentPage: number = 1;
  totalPage: number = 1;

  searchInputBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  rerenderList;

  constructor(rerenderList: () => void) {
    this.searchInputBox.classList.add('search-box');
    this.rerenderList = rerenderList;
    this.#setEvents();

    this.resize();
  }

  render() {
    this.renderSearchInput();
    const inputShowButton = this.renderInputShowButton();

    const headerBox = document.querySelector('header');
    if (!headerBox) return;
    headerBox.append(this.searchInputBox);
    headerBox.append(inputShowButton);
  }

  resize() {
    if (window.innerWidth <= 400) {
      this.searchInputBox.classList.add('search-box-expand', 'hidden');
      const logo = document.querySelector('header h1');

      if (!logo) return;
      logo.classList.add('hidden');
    }
  }

  renderSearchInput() {
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');
    this.searchInput.id = 'search-input';

    this.searchButton.id = 'search-button';
    this.searchButton.textContent = '검색';

    this.searchInputBox.append(this.searchInput);
    this.searchInputBox.append(this.searchButton);
  }

  renderInputShowButton() {
    const inputShowButton = document.createElement('button');
    inputShowButton.id = 'input-show-button';

    const searchImg = document.createElement('img');
    searchImg.setAttribute('src', searchIcon);

    inputShowButton.append(searchImg);

    inputShowButton.addEventListener('click', () => {
      inputShowButton.classList.add('hidden');
      this.searchInputBox.classList.remove('hidden');

      const logo = document.querySelector('header h1');
      if (!logo) return;
      this.searchInputBox.classList.toggle('search-box-expand');
    });

    this.searchInputBox.append(inputShowButton);
    return inputShowButton;
  }

  #setEvents() {
    this.searchInputBox.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      setEndpoint(END_POINT.SEARCH);
      setUrlParams(QUERY_STRING_KEYS.QUERY, this.searchInput.value);

      if (!this.searchInput.value.length) {
        this.searchInput.focus();
        return new Toast('검색어를 입력하세요.');
      }
      this.rerenderList();
    });
  }
}

export default searchInputBox;
