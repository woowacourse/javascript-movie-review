import CONDITIONS from '../../constants/CONDITIONS';
import { BUTTONS } from '../../constants/INFORMATION';
import Button from '../Button/Button';

const SearchBox = {
  create(header: HTMLElement, onSearching: () => void) {
    const searchBox = document.createElement('div');

    const searchInput = this.createSearchInput();
    const searchButton = Button.create(BUTTONS.search, () => {
      this.handleSearchButtonOnClick(header, () => onSearching());
    });

    searchBox.classList.add('search-box');

    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchButton);

    searchBox.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        searchButton.click();
      }
    });

    return searchBox;
  },

  createSearchInput() {
    const searchInput = document.createElement('input');

    searchInput.type = 'text';
    searchInput.placeholder = '검색';

    return searchInput;
  },

  handleSearchButtonOnClick(header: HTMLElement, onSearching: () => void) {
    if (window.innerWidth > CONDITIONS.mobileViewWidth) onSearching();

    if (window.innerWidth <= CONDITIONS.mobileViewWidth && header.classList.contains('clicked')) {
      onSearching();
    }

    if (window.innerWidth <= CONDITIONS.mobileViewWidth) {
      header.classList.add('clicked');
    }
  },
};

export default SearchBox;
