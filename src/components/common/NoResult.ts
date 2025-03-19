import { createElement } from '../../utils/createElement';
import { Img } from './Img';
import { Text } from './Text';

export const NoResult = () => {
  const container = createElement<HTMLDivElement>('div');
  container.classList.add('result-container');

  const planetImg = Img({
    width: '72',
    height: '62',
    src: './images/dizzy_planet.png',
  });

  const text = Text({
    props: {
      textContent: '검색 결과가 없습니다.',
    },
  });

  container.append(planetImg, text);
  return container;
};
