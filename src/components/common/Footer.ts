import { createElement } from '../../utils/createElement';
import { Img } from './Img';
import { Text } from './Text';

export const Footer = () => {
  return createElement<HTMLElement>('footer', {
    classList: 'footer',
    children: [
      Text({
        props: { textContent: '© 우아한테크코스 All Rights Reserved.' },
      }),
      Img({
        width: '180',
        height: '30',
        src: './images/woowacourse_logo.png',
      }),
    ],
  });
};
