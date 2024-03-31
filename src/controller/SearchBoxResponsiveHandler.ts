import { MOBILE_WIDTH } from '../constants';
import { changeElementClass, changingElementClassProps } from '../utils';

import ElementFinder from './ElementFinder';

const HIDDEN_INPUT_CLASS_NAME = 'off';

const SearchBoxResponsiveHandler = {
  /**
   * 브라우저 창의 크기에 따라 search input의 크기를 조절
   */
  handleSizeByWIndowSize() {
    const $searchInput = this.private_getSearchInputEl();
    if (!$searchInput) return;

    this.private_changeClassByWindowSize($searchInput);
  },
  /**
   * 모바일 사이즈에서 search button 클릭 시 search input의 크기를 늘리느 기능
   */
  handleSizeBySearchButton() {
    const $searchInput = this.private_getSearchInputEl();
    if (!$searchInput) return;

    this.private_changeClassByButtonClick($searchInput);
  },
  /**
   * 로고 버튼을 클릭 해 인기 영화 검색 시, input 창을 줄이는 기능
   */
  handleSizeByLogoButton() {
    const $searchInput = this.private_getSearchInputEl();

    if (!$searchInput) return;
    if ($searchInput.classList.contains(HIDDEN_INPUT_CLASS_NAME)) return;
    $searchInput.classList.add(HIDDEN_INPUT_CLASS_NAME);
  },

  private_getSearchInputEl() {
    const $searchInput = ElementFinder.findElementBySelector('.search-input');

    return $searchInput;
  },

  private_changeClassByWindowSize($searchInput: HTMLElement) {
    const width = window.innerWidth;
    const isHidden = this.private_isInputHidden($searchInput);

    const props: changingElementClassProps = {
      $targetElement: $searchInput,
      className: HIDDEN_INPUT_CLASS_NAME,
      conditionForClass: {
        additionCondition: width <= MOBILE_WIDTH && !isHidden,
        removalCondition: width > MOBILE_WIDTH && isHidden,
      },
    };
    changeElementClass(props);
  },

  private_isInputHidden($searchInput: HTMLElement) {
    return $searchInput.classList.contains(HIDDEN_INPUT_CLASS_NAME);
  },

  private_changeClassByButtonClick($searchInput: HTMLElement) {
    $searchInput.classList.toggle(HIDDEN_INPUT_CLASS_NAME);
  },
};

export default SearchBoxResponsiveHandler;
