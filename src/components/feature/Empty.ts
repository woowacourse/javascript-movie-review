import { Box } from '../common/Box';
import { Img } from '../common/Img';
import { Text } from '../common/Text';

export const Empty = () => {
  return Box({
    classList: ['result-container'],
    props: {
      children: [
        Img({
          width: '72',
          height: '62',
          src: './images/dizzy_planet.png',
        }),
        Text({
          classList: ['text-2xl', 'font-semibold', 'mt-24'],
          props: { textContent: '검색 결과가 없습니다.' },
        }),
      ],
    },
  });
};
