import { MOBILE_WIDTH } from '../../constants';
import {
  changeElementClass,
  changingElementClassProps,
  ElementFinder,
} from '../../utils';

const HIDDEN_INPUT_CLASS_NAME = 'off';

const SearchBoxResponsiveHandler = {
  /**
   * 브라우저 창의 크기에 따라 search input의 크기를 조절
   */
  handleSizeByWindowSize() {
    const $searchInput = ElementFinder.findElementBySelector('.search-input');
    if (!$searchInput) return;

    this.private_changeClassByWindowSize($searchInput);
  },
  /**
   * 모바일 크기의 화면에서 search button 클릭 시 search input의 크기를 변경하는 기능 (디바운스 적용)
   */
  handleSizeBySearchButton() {
    const $searchInput = ElementFinder.findElementBySelector('.search-input');
    if (!$searchInput) return;

    $searchInput.classList.toggle(HIDDEN_INPUT_CLASS_NAME);
  },
  /**
   *모바일 크기의 화면에서 로고 버튼을 클릭 해 인기 영화 검색 시, input 창을 줄이는 기능
   */
  handleSizeByLogoButton() {
    const $searchInput = ElementFinder.findElementBySelector('.search-input');
    if (!$searchInput) return;

    if ($searchInput.classList.contains(HIDDEN_INPUT_CLASS_NAME)) return;
    $searchInput.classList.add(HIDDEN_INPUT_CLASS_NAME);
  },

  private_changeClassByWindowSize($searchInput: HTMLElement) {
    const width = window.innerWidth;
    const isHidden = $searchInput.classList.contains(HIDDEN_INPUT_CLASS_NAME);

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
};

export default SearchBoxResponsiveHandler;
