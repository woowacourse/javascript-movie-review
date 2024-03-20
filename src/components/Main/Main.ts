import isHTMLElement from '../../utils/isHTMLElement';
import createElement from '../../utils/createElement';
function Main() {
  const appContainer = document.getElementById('app');
  const main = createElement('main');
  if (isHTMLElement(appContainer)) appContainer.appendChild(main);
}

export default Main;
