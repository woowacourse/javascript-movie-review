import '../SearchBox/SearchBox.css';

class SearchBox {
  currentPage: number = 1;
  totalPage: number = 1;

  searchBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  searchEvent;

  constructor({ searchEvent }: { searchEvent: (query: string) => Promise<void> }) {
    this.searchEvent = searchEvent;
    this.setEvents(searchEvent);
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

  setEvents(searchEvent: (query: string) => void) {
    this.searchBox.addEventListener('submit', (e: Event) => {
      e.preventDefault();

      this.searchEvent(this.searchInput.value);
    });
  }
}

export default SearchBox;
