import { createElement } from '../../utils/createElement';
import { Button } from './Button';
import { Icon } from './Icon';
import { Text } from './Text';

export const Header = () => {
  const headerElement = <HTMLHeadElement>createElement('header');

  const backgroundContainer = <HTMLDivElement>createElement('div');
  backgroundContainer.classList.add('background-container');

  const overlay = <HTMLDivElement>createElement('div', {
    'aria-hidden': 'true',
  });
  overlay.classList.add('overlay');

  const topRatedContainer = <HTMLDivElement>createElement('div');

  const logoImg = Icon({
    size: 123,
    src: './images/logo.png',
    classList: ['logo'],
    props: { alt: 'MovieLogo' },
  });

  const topRatedMovie = <HTMLDivElement>createElement('div');
  topRatedMovie.classList.add('top-rated-movie');

  const rateDiv = <HTMLDivElement>createElement('div');
  rateDiv.classList.add('rate');

  const starImg = Icon({
    size: 32,
    src: './images/star_empty.png',
  });
  starImg.classList.add('star');

  const rateText = Text({
    classList: ['rate-value'],
    props: {
      textContent: '9.5',
    },
  });

  const titleText = Text({
    classList: ['title'],
    props: {
      textContent: '인사이드 아웃2',
    },
  });

  const detailButton = Button({
    type: 'button',
    onClick: () => {},
    classList: ['primary', 'detail'],
    props: {
      textContent: '자세히 보기',
    },
  });

  headerElement.appendChild(backgroundContainer);
  backgroundContainer.append(overlay, topRatedContainer);
  topRatedContainer.append(logoImg, topRatedMovie);
  topRatedMovie.append(rateDiv, titleText, detailButton);
  rateDiv.append(starImg, rateText);

  return headerElement;
};
