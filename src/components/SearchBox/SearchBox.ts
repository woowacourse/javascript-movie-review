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
  }

  render() {
    const searchInputBox = this.renderSearchInput();

    searchInputBox.classList.add('search-box');
    const inputShowButton = this.renderInputShowButton();

    const headerBox = document.querySelector('header');
    if (!headerBox) return;
    headerBox.append(searchInputBox);
    headerBox.append(inputShowButton);
  }

  renderSearchInput() {
    const searchInputBox = document.createElement('div');
    searchInputBox.id = 'search-input-box';
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');
    this.searchInput.id = 'search-input';

    this.searchButton.id = 'search-button';
    this.searchButton.textContent = '검색';

    searchInputBox.append(this.searchInput);
    searchInputBox.append(this.searchButton);

    return searchInputBox;
  }

  renderInputShowButton() {
    const inputShowButton = document.createElement('button');
    inputShowButton.id = 'input-show-button';

    const searchImg = document.createElement('img');
    searchImg.setAttribute('src', searchIcon);

    inputShowButton.append(searchImg);

    inputShowButton.addEventListener('click', () => {
      this.searchInput.classList.add('hidden');
      this.searchButton.classList.add('hidden');
    });
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
