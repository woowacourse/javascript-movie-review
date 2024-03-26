import { BUTTON } from '../../constants/INFORMATION';
import Button from '../Button/Button';

const SearchBox = {
  create() {
    const searchBox = document.createElement('div');
    const searchInput = this.createSearchInput();
    const searchButton = this.createSearchButton();
    searchBox.classList.add('search-box');

    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchButton);

    return searchBox;
  },

  createSearchInput() {
    const searchInput = document.createElement('input');

    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', '검색');

    return searchInput;
  },

  createSearchButton() {
    return Button.create(BUTTON.search);
  },
};

export default SearchBox;
