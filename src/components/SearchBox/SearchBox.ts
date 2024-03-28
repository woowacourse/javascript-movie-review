import { $ } from '../../utils/dom';
import { showAlert } from '../Alert/Alert';

interface Props {
  searchHandler: (event: MouseEvent | KeyboardEvent) => void;
}

const SearchBox = ({ searchHandler }: Props) => {
  const searchBox = document.createElement('div');
  const searchInputLabel = document.createElement('label');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('search-box');
  searchInput.classList.add('search-input');
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

  searchButton.addEventListener('click', (event: MouseEvent) => {
    const searchInput = $('#search-text') as HTMLInputElement;
    if (searchInput.value === '') {
      showAlert('검색어를 입력해주세요.');
      return;
    }
    searchHandler(event);
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    const searchInput = $('#search-text') as HTMLInputElement;

    if (event.key === 'Enter' && searchInput.value === '') {
      showAlert('검색어를 입력해주세요.');
      return;
    }

    if (event.key === 'Enter' && !event.isComposing) {
      searchHandler(event);
      searchInput.value = '';
    }
  });

  return searchBox;
};

export default SearchBox;
