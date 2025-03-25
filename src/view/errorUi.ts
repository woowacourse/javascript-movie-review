import MessageDisplay from '../component/MessageDisplay';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

export const errorUi = (message: string) => {
  const skeleton = $('.skeleton');
  skeleton?.remove();

  const errorUI = createDOMElement({
    tag: 'div',
    className: 'error-ui',
    children: [MessageDisplay({ text: message })]
  });

  $('.container')?.replaceChildren(errorUI);
};
