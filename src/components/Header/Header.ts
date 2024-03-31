import { renderHandler } from './render';
import { onSearchMovieByKeyword, onReloadPage, onMobileToggleButton } from './eventHandler';

function Header() {
  const headerComponent = renderHandler();
  onMobileToggleButton();
  onSearchMovieByKeyword('web');
  onSearchMovieByKeyword('mobile');
  onReloadPage();

  return headerComponent;
}

export default Header;
