import { renderHandler } from './render';
import { keywordSubmitHandler } from './eventHandler';

function Header() {
  const headerComponent = renderHandler();
  keywordSubmitHandler();
  return headerComponent;
}

export default Header;
