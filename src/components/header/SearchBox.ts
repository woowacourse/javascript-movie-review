import { ALERT_MESSAGE } from '../../constant/movie';
import { hiddenElement, showElement } from '../../util/hiddenElement';
import { keydownEvent } from '../../util/keydownEvent';
import { isMobile, resizeWidth } from '../../util/resizeWidth';
import { showAlert } from '../common/Alert';

interface search {
  searchBox: HTMLElement;
  searchInput: HTMLElement;
}

interface searchElement extends search {
  searchButton: HTMLElement;
}

const adjustSearchUI = ({ searchInput, searchBox }: search) => {
  if (isMobile()) {
    hiddenElement(searchInput);
    searchBox.classList.add('mobile-search');
    return;
  }
  showElement(searchInput);
};

const resizeEvent = ({ searchInput, searchBox }: search) => {
  resizeWidth(() => adjustSearchUI({ searchInput, searchBox }));
};

const showSearchBar = ({ searchInput, searchBox }: search) => {
  searchBox.classList.remove('mobile-search');
  showElement(searchInput);
};

const setEvent = ({ searchBox, searchInput, searchButton }: searchElement) => {
  searchButton.addEventListener('click', (event) => {
    if (searchInput.classList.contains('hidden')) {
      showSearchBar({ searchInput, searchBox });
      hiddenElement(document.querySelector('h1'));

      searchInput.focus();
      return;
    }
    handleSearchClick(event);
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    keydownEvent({ event, key: 'Enter', func: () => handleSearchClick(event) });
  });

  resizeEvent({ searchInput, searchBox });
};

const handleSearchClick = (event: MouseEvent | KeyboardEvent) => {
  const input = document.querySelector('.search-input');

  if (!(input instanceof HTMLInputElement)) return;
  if (input.value === '') {
    showAlert(ALERT_MESSAGE.search);
    return;
  }

  event.target?.dispatchEvent(
    new CustomEvent('search', {
      bubbles: true,
      detail: input.value,
    }),
  );
  input.value = '';
};

const SearchBox = () => {
  const searchBox = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('mobile-search');
  searchBox.classList.add('search-box');
  searchInput.classList.add('search-input');
  searchButton.classList.add('search-button');

  searchInput.type = 'text';
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  setEvent({ searchBox, searchInput, searchButton });

  return searchBox;
};

export default SearchBox;
