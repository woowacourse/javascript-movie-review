import { movieFetcher } from '../../domain/MovieFetcher';
import { MovieItem as MovieItemType } from '../../types/Movie.types';
import { MovieDetailResponse } from '../../types/MovieDetail.types';
import { createElement } from '../../utils/createElement';
import { Box } from '../common/Box';
import { Img } from '../common/Img';
import { Modal } from '../common/Modal';
import { Text } from '../common/Text';
import { MovieDetailModal } from './MovieDetailModal';

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
          classList: ['text-lg', 'font-semibold', 'text-yellow', 'mt-2'],
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

export const MovieItem = ({ ...movieItem }: MovieItemType) => {
  const { id, title, vote_average, poster_path } = movieItem;
  const item = createElement<HTMLLIElement>('li', {
    classList: 'movie-item',
    children: [
      createMovieImage(title, poster_path),
      createDescriptionSection(title, vote_average),
    ],
  });

  const modal = document.querySelector('#modal');

  item.addEventListener('click', async () => {
    const loadingModal = Modal(
      Box({
        classList: ['flex-center'],
        props: {
          children: [
            Img({
              src: './images/loading.png',
              width: '50',
              height: '50',
              classList: ['loading-spinner'],
            }),
          ],
        },
      }),
    );
    modal?.appendChild(loadingModal);

    const detailData = await movieFetcher.getMovieDetail(id);
    if (detailData) {
      const modalElement = Modal(MovieDetailModal(detailData));
      modal?.replaceChild(modalElement, loadingModal);
    }
  });

  return item;
};
