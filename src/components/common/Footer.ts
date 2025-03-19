import { createElement } from '../../utils/createElement';
import { Img } from './Img';
import { Text } from './Text';

export const Footer = () => {
  const footerElement = createElement<HTMLButtonElement>('footer', {
    classList: 'footer',
  });

  const text = Text({
    props: {
      textContent: '&copy; 우아한테크코스 All Rights Reserved.',
    },
  });

  const icon = Img({
    width: '180',
    height: '30',
    src: './images/woowacourse_logo.png',
  });

  footerElement.append(text, icon);

  const app = document.querySelector('#app');
  app?.appendChild(footerElement);

  return footerElement;
};
