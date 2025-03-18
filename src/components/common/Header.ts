import { createElement } from '../../utils/createElement';
import { Button } from './Button';
import { Icon } from './Icon';
import { SearchBar } from './SearchBar';
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
  topRatedContainer.classList.add('top-rated-container');

  const logoImg = Icon({
    width: 117,
    height: 20,
    src: './images/logo.png',
    classList: ['logo'],
    props: { alt: 'MovieLogo' },
  });

  const topRatedMovie = <HTMLDivElement>createElement('div');
  topRatedMovie.classList.add('top-rated-movie');

  const rateDiv = <HTMLDivElement>createElement('div');
  rateDiv.classList.add('rate');

  const starImg = Icon({
    width: 32,
    height: 32,
    src: './images/star_empty.png',
  });

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

  const searchBar = SearchBar({ onSubmit: () => {} });

  headerElement.appendChild(backgroundContainer);
  backgroundContainer.append(overlay, topRatedContainer);
  topRatedContainer.append(logoImg, searchBar, topRatedMovie);
  topRatedMovie.append(rateDiv, titleText, detailButton);
  rateDiv.append(starImg, rateText);

  const app = document.querySelector('#app');
  app?.appendChild(headerElement);

  return headerElement;
};
