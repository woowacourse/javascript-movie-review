import { renderHandler } from './render';
import {
  onSearchMovieByKeyword,
  onReloadPage,
  onMobileToggleButton,
  onEnterMovieKeywordMobileInput,
} from './eventHandler';

function Header() {
  const headerComponent = renderHandler();
  onMobileToggleButton();
  onSearchMovieByKeyword('web');
  onSearchMovieByKeyword('mobile');
  onEnterMovieKeywordMobileInput();
  onReloadPage();

  return headerComponent;
}

export default Header;
