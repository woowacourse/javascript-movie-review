import { $ } from './util/selector';

const SearchButtonClickEvent = new Event('clickSearchButton');

class SearchBox {
  private searchBox;

  constructor() {
    this.searchBox = this.createElement();

    this.searchBox.addEventListener('submit', (event) => {
      const inputElement = $<HTMLInputElement>('input', this.searchBox);

      // TODO: 리펙토링
      if (inputElement && window.getComputedStyle(inputElement).getPropertyValue('display') === 'none') {
        inputElement.style.display = 'inline-block';
        this.searchBox.classList.add('full-cover-width');
        event.preventDefault();
      } else if (window.getComputedStyle(inputElement).getPropertyValue('display') !== 'none') {
        this.searchBox.classList.remove('full-cover-width');

        const width = window.innerWidth;
        if (width <= 660) inputElement.style.display = 'none';

        if (inputElement.value !== '') {
          this.searchBox.dispatchEvent(SearchButtonClickEvent);
          return;
        }
      }
    });
  }

  createElement() {
    const searchBox = document.createElement('form');

    const input = document.createElement('input');
    input.placeholder = '검색';
    input.type = 'text';

    const searchButton = document.createElement('button');
    searchButton.classList.add('search-button');
    searchButton.type = 'submit';
    searchButton.innerText = '검색';

    searchBox.append(input, searchButton);

    return searchBox;
  }

  get() {
    return this.searchBox;
  }
}

export default SearchBox;
/**
 * 토글 버튼과 원래의 폼을 둔다. 
 * 
 * 여기서 사이즈를 감지해, 사이즈가 660 이하로 줄어들면 교체한다. 
 * 
 
* Q. 교체 지점은?
 */
