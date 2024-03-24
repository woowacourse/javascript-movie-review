import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { setEndpoint, setUrlParams } from '../../utils/queryString';
import '../SearchBox/SearchBox.css';
import Toast from '../Toast/Toast';

class SearchBox {
  currentPage: number = 1;
  totalPage: number = 1;

  searchBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  rerenderList;

  constructor(rerenderList: () => void) {
    this.rerenderList = rerenderList;
    this.#setEvents();
  }

  render() {
    this.searchBox.classList.add('search-box');
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');
    this.searchInput.id = 'search-input';

    this.searchButton.classList.add('search-button');
    this.searchButton.textContent = '검색';

    this.searchBox.append(this.searchInput);
    this.searchBox.append(this.searchButton);

    return this.searchBox;
  }

  #setEvents() {
    this.searchBox.addEventListener('submit', (e: Event) => {
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

export default SearchBox;
