import { RULES } from '../../constants/rule';
import { SEARCH_BUTTON } from '../../resource';
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
  const searchImage = document.createElement('img');

  searchBox.classList.add('search-box');
  searchInput.classList.add('search-input');
  searchButton.classList.add('search-button');
  searchImage.classList.add('search-image');
  searchInputLabel.classList.add('sr-only');

  searchInput.setAttribute('id', 'search-text');
  searchInputLabel.setAttribute('for', 'search-text');
  searchInputLabel.textContent = '검색';
  searchInput.type = 'text';
  searchButton.type = 'button';
  searchInput.placeholder = '검색';
  searchImage.src = SEARCH_BUTTON;

  searchButton.appendChild(searchImage);

  searchBox.appendChild(searchInputLabel);
  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  searchButton.addEventListener('click', (event: MouseEvent) => {
    event.stopPropagation();
    const searchInput = $('#search-text') as HTMLInputElement;
    const searchBox = $('.search-box') as HTMLInputElement;
    const title = $('.title') as HTMLElement;

    if (searchBox.clientWidth < RULES.searchBoxWidth) {
      searchBox.style.width = `${RULES.searchBoxWidth}px`;
      title.classList.add('visibility-hidden', 'prevent-pointer-event');
      return;
    }

    if (searchInput.value === '') {
      showAlert('검색어를 입력해주세요.');
      return;
    }

    searchHandler(event);
    searchBox.style.width = '';
    title.classList.remove('visibility-hidden', 'prevent-pointer-event');
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    const searchInput = $('#search-text') as HTMLInputElement;
    const searchBox = $('.search-box') as HTMLInputElement;
    const title = $('.title') as HTMLElement;

    if (searchBox.clientWidth < RULES.searchBoxWidth) {
      searchBox.style.width = `${RULES.searchBoxWidth}px`;
      title.classList.add('visibility-hidden', 'prevent-pointer-event');
      return;
    }

    if (event.key === 'Enter' && searchInput.value === '') {
      showAlert('검색어를 입력해주세요.');
      return;
    }

    if (event.key === 'Enter' && !event.isComposing) {
      searchHandler(event);
      searchBox.style.width = '';
      title.classList.remove('visibility-hidden', 'prevent-pointer-event');
      title.style.pointerEvents = 'auto';
    }
  });

  return searchBox;
};

export default SearchBox;
