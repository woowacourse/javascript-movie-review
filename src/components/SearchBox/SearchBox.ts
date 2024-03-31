import { END_POINT, QUERY_STRING_KEYS } from '../../consts/URL';
import { setEndpoint, setUrlParams } from '../../utils/queryString';
import '../SearchBox/SearchBox.css';
import Toast from '../Toast/Toast';
import searchIcon from '../../assets/search_button.png';

class searchInputBox {
  currentPage: number = 1;
  totalPage: number = 1;
  header;
  headerLogo;

  prevWidth = window.innerWidth;

  searchInputBox = document.createElement('form');
  searchInput = document.createElement('input');
  searchButton = document.createElement('button');
  inputFoldButton = document.createElement('button');

  rerenderList;

  constructor(rerenderList: () => void) {
    this.header = document.querySelector('header') as HTMLElement;
    this.headerLogo = document.querySelector('header > h1') as HTMLElement;
    this.searchInputBox.classList.add('search-box', 'flex-center');
    this.searchButton.id = 'search-button';

    this.rerenderList = rerenderList;

    this.render();
    this.setEvents();
  }

  render() {
    this.createSearchInput();
    this.createSearchButton();
    this.createInputFoldButton();
  }

  createSearchInput() {
    this.searchInput.setAttribute('type', 'text');
    this.searchInput.setAttribute('placeholder', '검색');

    this.searchInput.id = 'search-input';

    this.searchInputBox.append(this.searchInput);
    this.searchInputBox.append(this.searchButton);
    this.header.append(this.searchInputBox);
  }

  createInputFoldButton() {
    this.inputFoldButton.id = 'input-fold-button';
    this.inputFoldButton.textContent = '>\nfold';
    this.inputFoldButton.style.display = 'none';
    this.header.prepend(this.inputFoldButton);
  }

  createSearchButton() {
    const searchImage = document.createElement('img');
    searchImage.id = 'search-icon';
    this.searchButton.id = 'search-button';
    this.searchButton.classList.add('flex-center');

    searchImage.setAttribute('src', searchIcon);
    this.searchButton.append(searchImage);
  }

  setEvents() {
    this.setSubmitEvent();
    this.setCloseInputEvent();
    this.handleResize();

    this.handleResize();

    let resizeEvent: NodeJS.Timeout | null;

    window.addEventListener('resize', () => {
      clearTimeout(resizeEvent!);

      resizeEvent = setTimeout(() => {
        resizeEvent = null;
        this.handleResize();
      }, 300);
    });
  }

  handleResize() {
    if (window.innerWidth <= 600) {
      console.log('aa');
      if (this.searchInputBox.classList.contains('open')) {
        this.headerLogo.style.display = 'none';
        this.inputFoldButton.style.display = 'block';
        return;
      }
      return (this.searchInput.style.display = 'none');
    }
    console.log('aa');
    this.searchInput.style.display = 'block';
    this.headerLogo.style.display = 'block';
    this.inputFoldButton.style.display = 'none';
  }

  setSubmitEvent() {
    this.searchButton.addEventListener('click', e => {
      e.preventDefault();
      if (this.searchInput.style.display === 'none') {
        this.setOpenInputEvent();
        return;
      }
      if (!this.searchInput.value.length) {
        this.searchInput.focus();
        return new Toast('검색어를 입력하세요.');
      }

      setEndpoint(END_POINT.SEARCH);
      setUrlParams(QUERY_STRING_KEYS.QUERY, this.searchInput.value);
      this.rerenderList();
    });
  }

  setOpenInputEvent() {
    this.headerLogo.style.display = 'none';
    this.searchInput.style.display = 'block';
    this.inputFoldButton.style.display = 'block';
    this.searchInput.focus();
    this.searchInputBox.classList.add('open');
  }

  setCloseInputEvent() {
    this.inputFoldButton.addEventListener('click', e => {
      e.preventDefault();
      this.searchInputBox.classList.remove('open');
      this.inputFoldButton.style.display = 'none';
      this.headerLogo.style.display = 'block';
      this.searchInput.style.display = 'none';
    });
  }
}

export default searchInputBox;
