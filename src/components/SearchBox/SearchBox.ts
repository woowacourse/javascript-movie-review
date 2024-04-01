import { URL } from '../../consts/common';
import { setUrlParams } from '../../utils/queryString';
import '../SearchBox/SearchBox.css';
import Toast from '../Toast/Toast';

interface Props {
  headerImage: HTMLImageElement;
  onSearch: () => Promise<void>;
}

class SearchBox {
  searchBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');

  headerImage;
  onSearch;

  constructor({ headerImage, onSearch }: Props) {
    this.headerImage = headerImage;
    this.onSearch = onSearch;
    this.setEvents(onSearch);
    this.setResponsiveEvents();
  }

  init() {
    this.searchBox.classList.add('search-box');
    this.searchInput.classList.add('search-input');
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');

    this.searchButton.classList.add('search-button');
    this.searchButton.textContent = '검색';

    this.searchBox.append(this.searchInput);
    this.searchBox.append(this.searchButton);

    return this.searchBox;
  }

  setEvents(onSearch: () => void) {
    this.searchBox.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (this.searchInput.classList.contains('hidden')) {
        this.headerImage.classList.add('hidden');
        this.searchBox.classList.add('expand');

        this.searchInput.classList.remove('hidden');

        return;
      }

      if (this.searchInput.value === '') {
        new Toast('검색어가 없습니다.');
        return;
      }

      setUrlParams(URL.MODE, 'search');
      setUrlParams(URL.QUERY, this.searchInput.value);
      setUrlParams(URL.PAGES, '1');

      onSearch();
    });
  }

  setResponsiveEvents() {
    let debounce: NodeJS.Timeout;

    window.addEventListener('resize', () => {
      if (debounce) clearTimeout(debounce);

      debounce = setTimeout(() => {
        if (window.innerWidth < 410) {
          this.searchInput.classList.add('hidden');
          this.searchBox.classList.remove('expand');
          this.searchButton.classList.add('alone');
        } else {
          this.searchInput.classList.remove('hidden');
          this.headerImage.classList.remove('hidden');
          this.searchBox.classList.remove('expand');
        }
      }, 100);
    });
  }
}

export default SearchBox;
