import { createElement } from '../../utils/createElement';
import { Icon } from './Icon';
import { Text } from './Text';

export const Footer = () => {
  const footerElement = <HTMLButtonElement>createElement('footer');
  footerElement.classList.add('footer');

  const text = Text({
    props: {
      textContent: '&copy; 우아한테크코스 All Rights Reserved.',
    },
  });

  const icon = Icon({
    size: 180,
    src: './images/woowacourse_logo.png',
  });

  footerElement.append(text, icon);

  const app = document.querySelector('#app');
  app?.appendChild(footerElement);

  return footerElement;
};
