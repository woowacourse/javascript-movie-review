import { createElement } from '../../utils/createElement';
import { Button } from './Button';
import { Img } from './Img';
import { SearchBar } from './SearchBar';
import { Text } from './Text';

export const Header = () => {
  const headerElement = createElement<HTMLHeadElement>('header');

  const backgroundContainer = createElement<HTMLDivElement>('div', {
    classList: 'background-container',
  });

  const overlay = createElement<HTMLDivElement>('div', {
    'aria-hidden': 'true',
    classList: 'overlay',
  });

  const topRatedContainer = createElement<HTMLDivElement>('div', {
    classList: 'top-rated-container',
  });

  const logoImg = Img({
    width: '117',
    height: '20',
    src: './images/logo.png',
    classList: ['logo'],
    props: { alt: 'MovieLogo' },
  });

  const topRatedMovie = createElement<HTMLDivElement>('div', {
    classList: 'top-rated-movie',
  });

  const rateDiv = createElement<HTMLDivElement>('div', {
    classList: 'rate',
  });

  const starImg = Img({
    width: '32',
    height: '32',
    src: './images/star_empty.png',
  });

  const rateText = Text({
    classList: ['text-2xl', 'font-semibold', 'text-yellow'],
    props: {
      textContent: '9.5',
    },
  });

  const titleText = Text({
    classList: ['text-3xl', 'font-semibold'],
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
