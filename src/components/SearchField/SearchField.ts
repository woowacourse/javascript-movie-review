import './style.css';
import Button from '../Button/Button';

class SearchField {
  private template: HTMLElement;

  constructor() {
    this.template = this.createSearchField();
    this.createElements();
    this.addEnterEventListener();
  }

  createSearchField() {
    const searchField = document.createElement('div');
    searchField.className = 'search-box';
    return searchField;
  }

  createElements() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.placeholder = '검색';

    const button = Button.createElements({
      className: ['search-button'],
      text: '검색',
      onClick: this.dispatchGetMatchedMovie.bind(this),
    });

    this.template.appendChild(input);
    this.template.appendChild(button);
  }

  addEnterEventListener() {
    const input = this.template.querySelector('input');
    input?.addEventListener('keyup', (event) => {
      if (event.isComposing || event.keyCode === 229) return;
      if (event.code === 'Enter') {
        this.dispatchGetMatchedMovie();
      }
    });
  }

  dispatchGetMatchedMovie() {
    const input = this.template.querySelector('input');
    const getMatchedMoviesEvent = new CustomEvent('GetMatchedMovies', {
      detail: {
        query: input?.value as string,
      },
      bubbles: true,
    });
    document.dispatchEvent(getMatchedMoviesEvent);
  }

  getElement() {
    return this.template;
  }
}

export default SearchField;
