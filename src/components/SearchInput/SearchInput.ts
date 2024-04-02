import './SearchInput.css';

import SCREEN_SIZE from '../../constants/responsive';
import SearchIcon from '../../statics/images/search_button.png';
import MovieStore from '../../stores/movieStore';

const createSearchBox = () => {
  const $searchBox = document.createElement('form');
  $searchBox.classList.add('search-box');
  return $searchBox;
};

const createSearchLabel = () => {
  const $searchLabel = document.createElement('label');
  $searchLabel.setAttribute('for', 'movie-search');
  return $searchLabel;
};

const createSearchInput = () => {
  const $searchInput = document.createElement('input');
  $searchInput.type = 'search';
  $searchInput.placeholder = '검색';
  $searchInput.id = 'movie-search';
  $searchInput.name = 'movie-search';

  return $searchInput;
};

const createSearchBtn = () => {
  const $searchBtn = document.createElement('button');
  $searchBtn.classList.add('search-button');
  $searchBtn.type = 'submit';

  const $img = document.createElement('img');
  $img.src = SearchIcon;
  $img.alt = '검색';

  $searchBtn.appendChild($img);

  return $searchBtn;
};

const SearchInput = () => {
  const $searchBox = createSearchBox();
  const $searchLabel = createSearchLabel();
  const $searchInput = createSearchInput();
  const $searchBtn = createSearchBtn();

  $searchBox.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    if ($searchInput.value === MovieStore.query) return;

    MovieStore.setMovies({ value: [] });
    MovieStore.setPage(1);
    MovieStore.type = 'search';
    MovieStore.setQuery($searchInput.value);

    $searchBox.dispatchEvent(
      new CustomEvent('searchMovies', {
        bubbles: true,
      }),
    );
  });

  $searchInput.addEventListener('input', (e: Event) => {
    if (MovieStore.type === 'search') return;

    const { target } = e;

    if (target instanceof HTMLInputElement && target.value === '') {
      MovieStore.setMovies({ value: [] });
      MovieStore.setPage(1);
      MovieStore.setQuery('');
      MovieStore.type = 'popular';

      $searchInput.dispatchEvent(
        new CustomEvent('popularMovies', {
          bubbles: true,
        }),
      );
    }
  });

  $searchBtn.addEventListener('click', () => {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= SCREEN_SIZE.mobile;

    if (isMobile) {
      $searchInput.classList.toggle('open');
    }
  });

  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    const isMobile = windowWidth <= SCREEN_SIZE.mobile;
    if (isMobile) return;

    const isSearchInputOpen = $searchInput.classList.contains('open');
    if (isSearchInputOpen) $searchInput.classList.remove('open');
  });

  const render = () => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild($searchLabel);
    fragment.appendChild($searchInput);
    fragment.appendChild($searchBtn);

    $searchBox.appendChild(fragment);
    return $searchBox;
  };

  return {
    render,
  };
};

export default SearchInput;
