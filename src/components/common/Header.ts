import { movieFetcher } from '../../domain/MovieFetcher';
import { createElement } from '../../utils/createElement';
import { Box } from './Box';
import { Button } from './Button';
import { Img } from './Img';
import { SearchBar } from './SearchBar';
import { Text } from './Text';

const createHeaderSection = () => {
  return createElement('section', {
    classList: 'flex flex-row items-center gap-250',
    children: [
      Img({
        width: '117',
        height: '20',
        src: './images/logo.png',
        classList: ['logo'],
        props: { alt: 'MovieLogo' },
      }),
      SearchBar({
        onSubmit: async (value) => await movieFetcher.getSearchMovies(1, value),
      }),
    ],
  });
};

const createRatingSection = () => {
  return Box({
    classList: ['rate'],
    props: {
      children: [
        Img({ width: '32', height: '32', src: './images/star_empty.png' }),
        Text({
          classList: ['text-2xl', 'font-semibold', 'text-yellow'],
          props: { textContent: '9.5' },
        }),
      ],
    },
  });
};

const createFeaturedMovieSection = () => {
  return Box({
    classList: ['top-rated-movie'],
    props: {
      children: [
        createRatingSection(),
        Text({
          classList: ['text-3xl', 'font-semibold'],
          props: { textContent: '인사이드 아웃2' },
        }),
        Button({
          type: 'button',
          onClick: () => {},
          classList: ['primary', 'detail'],
          props: { textContent: '자세히 보기' },
        }),
      ],
    },
  });
};

const createBackgroundContainer = () => {
  return Box({
    classList: ['background-container'],
    props: {
      children: [
        createElement<HTMLDivElement>('div', {
          'aria-hidden': 'true',
          classList: 'overlay',
        }),
        Box({
          classList: ['top-rated-container'],
          props: {
            children: [createHeaderSection(), createFeaturedMovieSection()],
          },
        }),
      ],
    },
  });
};

export const Header = () => {
  const headerElement = createElement<HTMLHeadElement>('header', {
    children: [createBackgroundContainer()],
  });

  document.querySelector('#app')?.appendChild(headerElement);

  return headerElement;
};
