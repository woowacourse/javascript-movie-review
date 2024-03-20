const handleSearchClick = (event: MouseEvent) => {
  const input = document.querySelector('.search-box > input');
  if (!(input instanceof HTMLInputElement)) return;

  event.target?.dispatchEvent(
    new CustomEvent('search-click', {
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
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  searchButton.addEventListener('click', (event) => handleSearchClick(event));

  return searchBox;
};

export default SearchBox;
