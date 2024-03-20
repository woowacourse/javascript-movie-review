const createSearchBox = () => {
  const $searchBox = document.createElement('div');
  $searchBox.classList.add('search-box');
  return $searchBox;
};

const SearchInput = () => {
  const $searchBox = createSearchBox();
  const $searchInput = document.createElement('input');
  const $searchBtn = document.createElement('button');

  const render = () => {
    $searchInput.type = 'text';
    $searchInput.placeholder = '검색';

    $searchBtn.classList.add('search-button');
    $searchBtn.textContent = '검색';

    $searchBox.innerHTML = ''; // Clear contents before appending

    $searchBox.appendChild($searchInput);
    $searchBox.appendChild($searchBtn);

    return $searchBox;
  };

  $searchInput.addEventListener('keydown', (e) => {
    const { target } = e;
    const { key } = e as KeyboardEvent;

    if (key === 'Enter' && target instanceof HTMLInputElement) {
      $searchInput.dispatchEvent(
        new CustomEvent('search', {
          bubbles: true,
          detail: {
            query: target.value,
          },
        }),
      );
    }
  });

  $searchInput.addEventListener('input', (e) => {
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

  $searchBtn.addEventListener('click', () => {
    const { value } = $searchInput as HTMLInputElement;
    $searchInput.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        detail: {
          query: value,
        },
      }),
    );
  });

  return {
    render,
  };
};

export default SearchInput;
