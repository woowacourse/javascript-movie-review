const SearchField = {
  createElements() {
    const searchField = document.createElement('div');
    searchField.className = 'search-box';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.placeholder = '검색';

    const button = document.createElement('button');
    button.className = 'search-button';
    button.textContent = '검색';

    searchField.appendChild(input);
    searchField.appendChild(button);
    return searchField;
  },
};

export default SearchField;
