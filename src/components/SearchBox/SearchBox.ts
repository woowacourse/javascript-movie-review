import { deleteParams, setUrlParams } from '../../utils/queryString';
import '../SearchBox/SearchBox.css';

class SearchBox {
  currentPage: number = 1;
  totalPage: number = 1;

  searchBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  rerenderList;

  constructor(rerenderList: () => void) {
    this.rerenderList = rerenderList;
    this.setEvents();
  }

  init() {
    this.searchBox.classList.add('search-box');
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');
    this.searchInput.required = true;

    this.searchButton.classList.add('search-button');
    this.searchButton.textContent = '검색';

    this.searchBox.append(this.searchInput);
    this.searchBox.append(this.searchButton);

    return this.searchBox;
  }

  setEvents() {
    this.searchBox.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      setUrlParams('query', this.searchInput.value);
      this.rerenderList();
    });
  }
}

export default SearchBox;
