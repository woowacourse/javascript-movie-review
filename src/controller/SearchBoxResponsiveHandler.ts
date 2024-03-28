import { MOBILE_WIDTH } from '../constants';
import { checkElementIsNotNull } from '../utils';

const CLASS_NAME = 'off';

const SearchBoxResponsiveHandler = {
  /**
   * 브라우저 창의 크기에 따라 search input의 크기를 조절
   */
  handleSizeByWIndowSize() {
    const $searchInput = this.private_getSearchInputEl();
    this.private_changeClassByWindowSize($searchInput);
  },
  /**
   * 모바일 사이즈에서 search button 클릭 시 search input의 크기를 늘리느 기능
   */
  handleSizeBySearchButton() {
    const $searchInput = this.private_getSearchInputEl();
    this.private_changeClassByButtonClick($searchInput);
  },
  /**
   * 로고 버튼을 클릭 해 인기 영화 검색 시, input 창을 줄이는 기능
   */
  handleSizeByLogoButton() {
    const $searchInput = this.private_getSearchInputEl();
    if ($searchInput.classList.contains(CLASS_NAME)) return;
    $searchInput.classList.add(CLASS_NAME);
  },

  private_getSearchInputEl() {
    const $searchInput = document.getElementsByClassName('search-input')[0];

    if (!$searchInput) checkElementIsNotNull($searchInput);
    return $searchInput;
  },

  private_changeClassByWindowSize($searchInput: Element) {
    const width = window.innerWidth;

    const isOffClassName = $searchInput.classList.contains(CLASS_NAME);
    if (width <= MOBILE_WIDTH && !isOffClassName) {
      $searchInput.classList.add(CLASS_NAME);
      return;
    }

    if (width > MOBILE_WIDTH && isOffClassName) {
      $searchInput.classList.remove(CLASS_NAME);
      return;
    }
  },

  private_changeClassByButtonClick($searchInput: Element) {
    $searchInput.classList.toggle(CLASS_NAME);
  },
};

export default SearchBoxResponsiveHandler;
