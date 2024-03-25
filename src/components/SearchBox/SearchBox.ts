import { BUTTONS } from '../../constants/INFORMATION';
import Button from '../Button/Button';

const SearchBox = {
  create(onSearching: () => void) {
    const searchBox = document.createElement('div');
    const searchInput = this.createSearchInput();
    const searchButton = Button.create(BUTTONS.search, onSearching);

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

    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', '검색');

    return searchInput;
  },
};

export default SearchBox;
