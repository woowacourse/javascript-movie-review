import { $ } from '../../util/selector';
import ASSETS from '../../constant/assets';
import setThrottle from '../../util/setThrottle';

const SearchButtonClickEvent = new Event('clickSearchButton');
const LogoClickEvent = new Event('logoClickEvent');

function createHeader() {
  const header = renderHeader();
  $('#app').prepend(header);

  const logo = $<HTMLImageElement>('.logo', header);
  const searchForm = $<HTMLFormElement>('.search-box', header);
  const searchInput = $<HTMLInputElement>('input', searchForm);
  const searchButton = $<HTMLButtonElement>('.search-button', header);

  window.addEventListener(
    'resize',
    setThrottle({
      callbackFunction: () => handleResizeWindow({ searchForm, searchInput }),
      delay: 300,
    }),
  );

  searchInput.addEventListener('focusout', (event) => {
    const relatedTarget = event.relatedTarget as HTMLElement;
    handleFocusOutInput({ relatedTarget, searchForm, searchInput });
  });

  searchInput.addEventListener('keydown', (event) => {
    handleKeydown({ event, searchForm, searchInput });
  });

  searchButton.addEventListener('click', (event) => {
    if (event.target) {
      handleClickSearchButton({ event, target: event.target, searchForm, searchInput });
    }
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target) {
      event.target.dispatchEvent(SearchButtonClickEvent);
      searchInput.focus();
    }
  });

  logo.addEventListener('click', (event) => {
    if (event.target) {
      event.target.dispatchEvent(LogoClickEvent);
    }
  });
}

function handleClickSearchButton({
  event,
  target,
  searchForm,
  searchInput,
}: {
  event: MouseEvent;
  target: EventTarget;
  searchForm: HTMLFormElement;
  searchInput: HTMLInputElement;
}) {
  if (window.innerWidth <= 440 && searchInput.value.trim() === '') {
    event.preventDefault();
    searchForm.classList.toggle('active');
    searchInput.focus();
    return;
  }
  target.dispatchEvent(SearchButtonClickEvent);
  searchInput.focus();
}

function handleResizeWindow({
  searchForm,
  searchInput,
}: {
  searchForm: HTMLFormElement;
  searchInput: HTMLInputElement;
}) {
  if (window.innerWidth > 440 && searchForm.classList.contains('active')) {
    searchForm.classList.remove('active');
  }
  if (window.innerWidth <= 440) {
    searchInput.value = '';
  }
}

function handleFocusOutInput({
  relatedTarget,
  searchForm,
  searchInput,
}: {
  relatedTarget: HTMLElement | null;
  searchForm: HTMLFormElement;
  searchInput: HTMLInputElement;
}) {
  if (!relatedTarget || !searchForm.contains(relatedTarget)) {
    if (window.innerWidth <= 440 && searchForm.classList.contains('active')) {
      searchInput.value = '';
      searchForm.classList.remove('active');
    }
  }
}

function handleKeydown({
  event,
  searchForm,
  searchInput,
}: {
  event: KeyboardEvent;
  searchForm: HTMLFormElement;
  searchInput: HTMLInputElement;
}) {
  if (event.key === 'Escape') {
    searchInput.value = '';
    searchInput.blur();
    searchForm.classList.remove('active');
  }
}

function renderHeader() {
  const header = document.createElement('header');

  const logo = document.createElement('img');
  logo.classList.add('logo');
  logo.alt = 'MovieList 로고';
  logo.src = ASSETS.logoImage;

  const searchBox = renderSearchBox();
  searchBox.classList.add('search-box');

  header.append(logo, searchBox);

  return header;
}

function renderSearchBox() {
  const searchBox = document.createElement('form');

  const input = document.createElement('input');
  input.placeholder = '검색';
  input.type = 'search';
  input.tabIndex = 0;

  const searchButton = document.createElement('button');
  searchButton.classList.add('search-button');
  searchButton.type = 'submit';
  searchButton.innerText = '검색';
  searchButton.tabIndex = 1;

  searchBox.append(input, searchButton);

  return searchBox;
}

export default createHeader;
