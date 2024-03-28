import { URL } from '../../consts/common';
import { setUrlParams } from '../../utils/queryString';
import '../SearchBox/SearchBox.css';

class SearchBox {
  searchBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  onSearch;

  constructor({ onSearch: onSearch }: { onSearch: () => Promise<void> }) {
    this.onSearch = onSearch;
    this.setEvents(onSearch);
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

  setEvents(onSearch: () => void) {
    this.searchBox.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      setUrlParams(URL.MODE, 'search');
      setUrlParams(URL.QUERY, this.searchInput.value);
      setUrlParams(URL.PAGES, '1');

      onSearch();
    });
  }
}

export default SearchBox;
