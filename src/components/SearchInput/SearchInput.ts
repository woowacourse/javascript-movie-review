import './SearchInput.css';

import SearchIcon from '../../statics/images/search_button.png';

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

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    $searchInput.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        detail: {
          query: formData.get('movie-search'),
        },
      }),
    );
  });

  $searchInput.addEventListener('input', (e: Event) => {
    const { target } = e;
    if (target instanceof HTMLInputElement && target.value === '') {
      $searchInput.dispatchEvent(
        new CustomEvent('popular', {
          bubbles: true,
          detail: {
            curType: 'search',
          },
        }),
      );
    }
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
