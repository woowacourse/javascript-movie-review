// TODO: CustomEvent 구현 이유?

import { $ } from '../../utils/dom';
import { showAlert } from '../Alert/Alert';

const handleSearchClick = (event: MouseEvent | KeyboardEvent) => {
  const input = $('#search-text') as HTMLInputElement;

  event.target?.dispatchEvent(
    new CustomEvent<string>('search', {
      bubbles: true,
      detail: input.value,
    }),
  );
};

const SearchBox = () => {
  const searchBox = document.createElement('div');
  const searchInputLabel = document.createElement('label');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('search-box');
  searchButton.classList.add('search-button');
  searchInputLabel.classList.add('sr-only');

  searchInput.setAttribute('id', 'search-text');
  searchInputLabel.setAttribute('for', 'search-text');
  searchInputLabel.textContent = '검색';
  searchInput.type = 'text';
  searchButton.type = 'button';
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  searchBox.appendChild(searchInputLabel);
  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  searchButton.addEventListener('click', (event) => {
    handleSearchClick(event);
    searchInput.value = '';
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' && ($('#search-text') as HTMLInputElement).value === '') {
      showAlert('검색어를 입력해주세요.');
      return;
    }

    if (event.key === 'Enter' && !event.isComposing) {
      handleSearchClick(event);
      searchInput.value = '';
    }
  });

  return searchBox;
};

export default SearchBox;
