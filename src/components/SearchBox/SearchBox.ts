const handleSearchClick = (event: MouseEvent | KeyboardEvent) => {
  const input = document.querySelector('.search-box > input');
  if (!(input instanceof HTMLInputElement)) return;

  event.target?.dispatchEvent(
    new CustomEvent('search', {
      bubbles: true,
      detail: input.value,
    }),
  );
};

const SearchBox = () => {
  const searchBox = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('search-box');
  searchButton.classList.add('search-button');

  searchInput.type = 'text';
  searchButton.type = 'button';
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  searchButton.addEventListener('click', (event) => {
    handleSearchClick(event);
    searchInput.value = '';
  });

  searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      handleSearchClick(event);
      searchInput.value = '';
    }
  });

  return searchBox;
};

export default SearchBox;
