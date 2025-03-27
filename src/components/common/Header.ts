import { movieFetcher } from '../../domain/MovieFetcher';
import { movieFetcherEvent } from '../../domain/MovieFetcherEvent';
import { MovieItem } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { MovieDetailModal } from '../feature/MovieDetailModal';
import { Box } from './Box';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { Img } from './Img';
import { Loading } from './Loading';
import { Modal } from './Modal';
import { SearchBar } from './SearchBar';
import { Skeleton } from './Skeleton';
import { Text } from './Text';

const createHeaderSection = () => {
  return createElement('section', {
    classList: 'section-container',
    children: [
      IconButton({
        width: '117',
        height: '20',
        src: './images/logo.png',
        classList: ['logo'],
        onClick: () => {
          window.location.reload();
        },
        props: { alt: 'MovieLogo' },
      }),
      SearchBar({
        classList: ['search-bar'],
        onSubmit: async (value) => await movieFetcher.getSearchMovies(1, value),
      }),
    ],
  });
};

const createRatingSection = (rate: number) => {
  return Box({
    classList: ['rate'],
    props: {
      children: [
        Img({ width: '32', height: '32', src: './images/star_empty.png' }),
        Text({
          classList: ['text-2xl', 'font-semibold', 'text-yellow'],
          props: { textContent: `${rate}` },
        }),
      ],
    },
  });
};

const createFeaturedMovieSection = (
  id: number,
  title: string,
  rate: number,
) => {
  const openMovieDetailModal = async (movieId: number) => {
    const modal = document.querySelector('#modal');
    modal?.appendChild(Modal(Loading()));

    const detailData = await movieFetcher.getMovieDetail(movieId);

    if (detailData) {
      modal?.replaceChildren(Modal(MovieDetailModal(detailData)));
    }
  };

  return Box({
    classList: ['top-rated-movie'],
    props: {
      children: [
        createRatingSection(rate),
        Text({
          classList: ['text-3xl', 'font-semibold'],
          props: { textContent: title },
        }),
        Button({
          type: 'button',
          onClick: () => openMovieDetailModal(id),
          classList: ['primary', 'detail'],
          props: { textContent: '자세히 보기' },
        }),
      ],
    },
  });
};

const createBackgroundContainer = (movie: MovieItem) => {
  const { id, title, vote_average, poster_path } = movie;
  const isSearch = movieFetcher.isSearchState;

  const backgroundClassList = [
    'background-container',
    ...(isSearch ? ['search-header-container'] : []),
  ];

  const backgroundStyle = isSearch
    ? ''
    : `background-image: url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${poster_path})`;

  return Box({
    classList: backgroundClassList,
    props: {
      style: backgroundStyle,
      children: [
        Box({
          classList: !isSearch ? ['overlay'] : [],
          props: {
            'aria-hidden': 'true',
          },
        }),
        Box({
          classList: ['top-rated-container'],
          props: {
            children: [
              createHeaderSection(),
              ...(isSearch
                ? []
                : [createFeaturedMovieSection(id, title, vote_average)]),
            ],
          },
        }),
      ],
    },
  });
};

const renderHeader = (headerElement: HTMLHeadElement) => {
  const {
    isLoadingState: isLoading,
    isSearchState: isSearch,
    movies,
  } = movieFetcher;

  const existingSkeleton = headerElement.querySelector('.skeleton-gradient');
  if (existingSkeleton) {
    existingSkeleton.remove();
  }

  if (isLoading && !isSearch && movies.length === 0) {
    headerElement.appendChild(Skeleton({ width: 1980, height: 500 }));
    headerElement.classList.add('skeleton-animation');
    return;
  }

  if (movies.length > 0) {
    headerElement.replaceChildren(createBackgroundContainer(movies[0]));
  }

  headerElement.classList.remove('skeleton-animation');
};

export const Header = () => {
  const headerElement = createElement<HTMLHeadElement>('header', {});

  renderHeader(headerElement);
  movieFetcherEvent.subscribe(() => renderHeader(headerElement));
  document.querySelector('#app')?.appendChild(headerElement);

  return headerElement;
};
