import { renderHandler } from './render';
import {
  keywordSearchInputSubmitHandler,
  reloadPageHandler,
  mobileInputEnterHandler,
  mobileToggleButtonHandler,
} from './eventHandler';

function Header() {
  const headerComponent = renderHandler();
  mobileToggleButtonHandler();
  keywordSearchInputSubmitHandler('web');
  keywordSearchInputSubmitHandler('mobile');
  mobileInputEnterHandler();
  reloadPageHandler();

  return headerComponent;
}

export default Header;
