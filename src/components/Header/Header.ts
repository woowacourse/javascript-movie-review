import { renderHandler } from './render';
import { keywordSubmitHandler, reloadPageHandler } from './eventHandler';

function Header() {
  const headerComponent = renderHandler();
  keywordSubmitHandler();
  reloadPageHandler();
  return headerComponent;
}

export default Header;
