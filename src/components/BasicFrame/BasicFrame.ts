import isHTMLElement from '../../utils/isHTMLElement';
import createElement from '../../utils/createElement';

function BasicFrame() {
  const appContainer = document.getElementById('app');
  const main = createElement('main');
  const section = createElement('section', { className: 'item-view' });
  const ul = createElement('ul', { className: 'item-list' });
  main.appendChild(section);
  section.appendChild(ul);

  if (!isHTMLElement(appContainer)) {
    throw new Error('id가 app인 htmlElement를 찾을 수 없습니다.');
  }

  appContainer.appendChild(main);
}

export default BasicFrame;
