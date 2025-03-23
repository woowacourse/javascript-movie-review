import { MovieItem as MovieItemType } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Box } from '../common/Box';
import { Img } from '../common/Img';
import { Text } from '../common/Text';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const DEFAULT_IMAGE_URL = './images/no_image.png';

const createRatingSection = (vote_average: number) => {
  return Box({
    classList: ['movie-rate'],
    props: {
      children: [
        Img({
          width: '16',
          height: '16',
          src: './images/star_empty.png',
        }),
        Text({
          classList: ['text-lg', 'font-semibold', 'text-yellow'],
          props: {
            textContent: `${vote_average}`,
          },
        }),
      ],
    },
  });
};

const createDescriptionSection = (title: string, vote_average: number) => {
  return Box({
    classList: ['movie-description'],
    props: {
      children: [
        createRatingSection(vote_average),
        Text({
          classList: ['text-xl', 'font-bold'],
          props: {
            textContent: title,
          },
        }),
      ],
    },
  });
};

const createMovieImage = (title: string, poster_path: string) => {
  return Img({
    src: poster_path ? `${IMAGE_BASE_URL}${poster_path}` : DEFAULT_IMAGE_URL,
    classList: ['thumbnail'],
    props: {
      alt: title,
    },
  });
};

export const MovieItem = ({
  title,
  vote_average,
  poster_path,
}: MovieItemType) => {
  return createElement<HTMLLIElement>('li', {
    classList: 'movie-item',
    children: [
      createMovieImage(title, poster_path),
      createDescriptionSection(title, vote_average),
    ],
  });
};
