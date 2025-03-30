import { movieFetcher } from '../../domain/MovieFetcher';
import {
  MovieItem as MovieItemType,
  MovieDetail,
} from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Box } from '../common/Box';
import { Img } from '../common/Img';
import { Text } from '../common/Text';
import { openModal } from './MovieDetailModal';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face';
const DEFAULT_IMAGE_URL = './images/no_image.png';

const createLoadingView = () => {
  return createElement<HTMLDivElement>('div', {
    className: 'modal-loading',
    children: [
      createElement<HTMLParagraphElement>('p', {
        className: 'loading-text',
        textContent: '영화 정보를 불러오는 중...',
      }),
    ],
  });
};

const createErrorView = (message: string) => {
  return createElement<HTMLDivElement>('div', {
    className: 'modal-error',
    children: [
      createElement<HTMLParagraphElement>('p', {
        className: 'error-text',
        textContent: `정보를 불러오는데 실패했습니다: ${message}`,
      }),
    ],
  });
};

const createCloseButton = () => {
  return createElement<HTMLButtonElement>('button', {
    className: 'close-modal',
    id: 'closeModal',
    children: [
      createElement<HTMLImageElement>('img', {
        src: './images/modal_button_close.png',
      }),
    ],
  });
};

const createBaseModal = (content: HTMLElement) => {
  const closeButton = createCloseButton();

  const modal = createElement<HTMLDivElement>('div', {
    className: 'modal',
    children: [closeButton, content],
  });

  const modalBackground = createElement<HTMLDivElement>('div', {
    className: 'modal-background active',
    id: 'modalBackground',
    children: [modal],
  });

  closeButton.addEventListener('click', () => {
    modalBackground.classList.remove('active');
    setTimeout(() => {
      modalBackground.remove();
      document.removeEventListener('keydown', handleKeyDown);
    }, 300);
  });

  modalBackground.addEventListener('click', (e) => {
    if (e.target === modalBackground) {
      closeButton.click();
    }
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeButton.click();
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return modalBackground;
};

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

export const MovieItem = (movie: MovieItemType) => {
  const { title, vote_average, poster_path, id } = movie;

  const movieItem = createElement<HTMLLIElement>('li', {
    classList: 'movie-item',
    children: [
      createMovieImage(title, poster_path),
      createDescriptionSection(title, vote_average),
    ],
  });

  movieItem.addEventListener('click', async () => {
    const loadingView = createLoadingView();
    const modalBackground = createBaseModal(loadingView);
    document.body.appendChild(modalBackground);

    try {
      const movieDetail: MovieDetail = await movieFetcher.getMovieDetail(id);

      document.body.removeChild(modalBackground);
      openModal(movieDetail);
    } catch (error) {
      const errorView = createErrorView((error as Error).message);
      loadingView.replaceWith(errorView);

      setTimeout(() => {
        modalBackground
          .querySelector('#closeModal')
          ?.dispatchEvent(new Event('click'));
      }, 3000);
    }
  });

  movieItem.style.cursor = 'pointer';

  return movieItem;
};
