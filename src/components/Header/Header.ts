import { renderHandler } from './render';
import { keywordSubmitHandler, reloadPageHandler } from './eventHandler';
import { mobileToggleButtonHandler, mobileInputEnterHandler } from './eventHandler';

function Header() {
  const headerComponent = renderHandler();
  mobileToggleButtonHandler();
  keywordSubmitHandler('web');
  keywordSubmitHandler('mobile');
  mobileInputEnterHandler();
  reloadPageHandler();
  return headerComponent;
}

export default Header;
