import MessageDisplay from '../component/MessageDisplay';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';

export const errorUi = (message: string) => {
  const errorUI = createDOMElement({
    tag: 'div',
    className: 'error-ui',
    children: [MessageDisplay({ text: message })]
  });

  if ($('.error-ui')) {
    $('.error-ui')?.replaceWith(errorUI);
  } else {
    $('.thumbnail-list')?.replaceWith(errorUI);
  }
};
