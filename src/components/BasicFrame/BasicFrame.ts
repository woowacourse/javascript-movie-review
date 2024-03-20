import isHTMLElement from '../../utils/isHTMLElement';
import createElement from '../../utils/createElement';

function BasicFrame() {
  const appContainer = document.getElementById('app');
  const main = createElement('main');
  const section = createElement('section', { className: 'item-view' });
  const ul = createElement('ul', { className: 'item-list' });
  main.appendChild(section);
  section.appendChild(ul);

  if (isHTMLElement(appContainer)) appContainer.appendChild(main);
}

export default BasicFrame;
