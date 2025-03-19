import { createElement } from '../../utils/createElement';
import { Img } from './Img';
import { Text } from './Text';

export const Footer = () => {
  const footerElement = createElement<HTMLButtonElement>('footer', {
    classList: 'footer',
  });

  const text = Text({
    props: {
      textContent: '© 우아한테크코스 All Rights Reserved.',
    },
  });

  const p = createElement<HTMLParagraphElement>('p');

  const icon = Img({
    width: '180',
    height: '30',
    src: './images/woowacourse_logo.png',
  });

  p.appendChild(icon);
  footerElement.append(text, p);

  const app = document.querySelector('#app');
  app?.appendChild(footerElement);

  return footerElement;
};
