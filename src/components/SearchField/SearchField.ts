import './style.css';
import Button from '../Button/Button';

const SearchField = {
  createElements() {
    const searchField = document.createElement('div');
    searchField.className = 'search-box';

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.placeholder = '검색';

    const button = Button.createElements({
      className: ['search-button'],
      text: '검색',
      onClick: this.handleOnClick,
    });

    searchField.appendChild(input);
    searchField.appendChild(button);
    return searchField;
  },

  handleOnClick() {},
};

export default SearchField;
