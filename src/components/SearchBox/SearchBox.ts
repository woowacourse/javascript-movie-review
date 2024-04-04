import { ALERT_MESSAGE } from '../../constants/messages';
import { SEARCH_BUTTON } from '../../resource';
import { $ } from '../../utils/dom';

interface Props {
  searchHandler: (event: MouseEvent | KeyboardEvent) => void;
}

const SearchBox = ({ searchHandler }: Props) => {
  const SEARCH_BOX_MAX_WIDTH = 320;
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
    const header = $('header') as HTMLElement;
    const target = event.target as HTMLElement;
    const searchInput = $('#search-text') as HTMLInputElement;
    const searchBox = target.closest('.search-box') as HTMLDivElement;
    const title = $('.title') as HTMLElement;

    if (searchBox.clientWidth < SEARCH_BOX_MAX_WIDTH) {
      header.classList.add('shrinked');
      return;
    }

    if (searchInput.value === '') {
      const alert = $('.alert-container') as HTMLDivElement;
      const alertText = $('.alert-text') as HTMLSpanElement;

      alertText.textContent = ALERT_MESSAGE.searchInputEmpty;
      alert.classList.remove('hidden');
      setTimeout(() => {
        alert.classList.add('hidden');
      }, 3000);

      return;
    }

    searchHandler(event);
    header.classList.remove('shrinked');
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    const header = $('header') as HTMLElement;
    const searchInput = $('#search-text') as HTMLInputElement;
    const searchBox = $('.search-box') as HTMLInputElement;
    const title = $('.title') as HTMLElement;

    if (searchBox.clientWidth < SEARCH_BOX_MAX_WIDTH) {
      header.classList.add('shrinked');
      return;
    }

    if (event.key === 'Enter' && searchInput.value === '') {
      const alert = $('.alert-container') as HTMLDivElement;
      const alertText = $('.alert-text') as HTMLSpanElement;

      alertText.textContent = ALERT_MESSAGE.searchInputEmpty;
      header.classList.remove('shrinked');
      setTimeout(() => {
        alert.classList.add('hidden');
        alertText.textContent = '';
      }, 3000);

      return;
    }

    if (event.key === 'Enter' && !event.isComposing) {
      searchHandler(event);
      header.classList.remove('shrinked');
    }
  });

  return searchBox;
};

export default SearchBox;
