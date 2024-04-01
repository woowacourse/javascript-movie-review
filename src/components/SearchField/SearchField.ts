import './style.css';

import Button from '../Button/Button';

class SearchField {
  private template: HTMLElement;

  constructor() {
    this.template = this.createSearchField();
    this.createTemplate();
    this.addEnterEventListener();
    this.addInputEventListener();
  }

  createSearchField() {
    const searchField = document.createElement('div');
    searchField.className = 'search-box';
    return searchField;
  }

  createTemplate() {
    const input = document.createElement('input');
    input.classList.add('search-input');
    input.setAttribute('type', 'text');
    input.maxLength = 30;
    input.placeholder = '검색어를 입력하세요';

    const button = Button.createTemplate({
      className: ['search-button'],
      text: '검색',
      onClick: this.handleBlur.bind(this),
    });

    this.template.appendChild(input);
    this.template.appendChild(button);
  }

  addEnterEventListener() {
    const input = this.template.querySelector('input');
    input?.addEventListener('keyup', (event) => {
      if (event.code === 'Enter') {
        this.handleBlur();
      }
    });
  }

  handleBlur() {
    const input = this.template.querySelector('input') as HTMLInputElement;
    const logo = document.querySelector('header')?.querySelector('h1') as HTMLHeadingElement;
    input.classList.toggle('input--open');
    this.template.classList.toggle('input--open');
    logo.classList.toggle('logo--hidden');
    input.value = '';
    input.blur();
  }

  addInputEventListener() {
    let debounce: NodeJS.Timeout;
    const input = this.template.querySelector('input') as HTMLInputElement;
    input?.addEventListener('input', () => {
      if (debounce) {
        clearTimeout(debounce);
      }
      debounce = setTimeout(() => {
        this.dispatchGetMatchedMovie();
      }, 300);
    });
  }

  dispatchGetMatchedMovie() {
    const input = this.template.querySelector('input') as HTMLInputElement;
    if (input.value.trim()) {
      const getMatchedMoviesEvent = new CustomEvent('GetMatchedMovies', {
        detail: { query: input.value },
        bubbles: true,
      });
      document.dispatchEvent(getMatchedMoviesEvent);
    }
  }

  getElement() {
    return this.template;
  }
}

export default SearchField;
