import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../../constants/requests';
import movieStore from '../../stores/movieStore';
import fetchData from '../../utils/fetchData';
import MovieList from '../MovieList/MovieList';
import SkeletonMovieList from '../MovieList/SkeletonMovieList';

interface Params {
  [key: string]: string | number | boolean;
}

const fetchSearchMovies = async (params: Params) => {
  const getURL = () =>
    `${REQUEST_URL.searchMovies}${new URLSearchParams({
      ...COMMON_PARAMS,
      ...params,
    })}`;
  const data = await fetchData({
    url: getURL(),
    options: COMMON_OPTIONS,
  });

  const { page } = data;
  const movies = [...data.results].map(
    ({ id, title, vote_average, poster_path }) => ({
      id,
      title,
      vote_average,
      poster_path,
    }),
  );
  return { movies, page };
};

const fetchPopularMovies = async (params: Params) => {
  const getURL = () =>
    `${REQUEST_URL.popularMovies}${new URLSearchParams({
      ...COMMON_PARAMS,
      ...params,
    })}`;
  const data = await fetchData({
    url: getURL(),
    options: COMMON_OPTIONS,
  });

  const { page } = data;
  const movies = [...data.results].map(
    ({ id, title, vote_average, poster_path }) => ({
      id,
      title,
      vote_average,
      poster_path,
    }),
  );
  return { movies, page };
};

const Main = () => {
  const $main = document.createElement('main');

  document.addEventListener('search', (e) => {
    const { detail } = e as CustomEvent;
    if (detail.curType !== 'search') movieStore.setPage(1);

    const $prevMovieList = $main.querySelector('.item-view') as HTMLElement;
    $main.removeChild($prevMovieList);
    const $skeletonMovieList = SkeletonMovieList({
      title: `\"${detail.query}\" 검색 결과`,
    }).render();
    $main.appendChild($skeletonMovieList);

    fetchSearchMovies({ query: detail.query, page: movieStore.page })
      .then(({ movies, page }) => {
        if (page !== 1) {
          movieStore.setMovies([...movieStore.movies, ...movies], () => {
            $main.removeChild($skeletonMovieList);
            $main.appendChild(
              MovieList({
                title: `\"${detail.query}\" 검색 결과`,
                type: 'search',
              }).render(),
            );
          });
          movieStore.setPage(page + 1);
        } else {
          movieStore.setMovies(movies, () => {
            $main.removeChild($skeletonMovieList);
            $main.appendChild(
              MovieList({
                title: `\"${detail.query}\" 검색 결과`,
                type: 'search',
              }).render(),
            );
          });
          movieStore.setPage(page + 1);
        }
      })
      .catch(() => {
        const $ul = document.querySelector('.item-view ul') as HTMLElement;
        const $h2 = document.querySelector('.item-view h2') as HTMLElement;
        const $itemView = document.querySelector('.item-view');
        $itemView?.removeChild($ul);
        $itemView?.removeChild($h2);
      });
  });

  document.addEventListener('popular', (e) => {
    const { detail } = e as CustomEvent;
    if (detail.curType !== 'popular') movieStore.setPage(1);

    const $prevMovieList = $main.querySelector('.item-view') as HTMLElement;
    if ($prevMovieList) {
      $main.removeChild($prevMovieList);
    }
    const $skeletonMovieList = SkeletonMovieList({
      title: '지금 인기있는 영화',
    }).render();
    $main.appendChild($skeletonMovieList);

    fetchPopularMovies({ page: movieStore.page })
      .then(({ movies, page }) => {
        if (page !== 1) {
          movieStore.setMovies([...movieStore.movies, ...movies], () => {
            $main.removeChild($skeletonMovieList);
            $main.appendChild(
              MovieList({
                title: '지금 인기있는 영화',
                type: 'popular',
              }).render(),
            );
          });
          movieStore.setPage(page + 1);
        } else {
          movieStore.setMovies(movies, () => {
            $main.removeChild($skeletonMovieList);
            $main.appendChild(
              MovieList({
                title: '지금 인기있는 영화',
                type: 'popular',
              }).render(),
            );
          });
          movieStore.setPage(page + 1);
        }
      })
      .catch(() => {
        const $ul = document.querySelector('.item-view ul') as HTMLElement;
        const $h2 = document.querySelector('.item-view h2') as HTMLElement;
        const $itemView = document.querySelector('.item-view');
        $itemView?.removeChild($ul);
        $itemView?.removeChild($h2);
      });
  });

  document.dispatchEvent(
    new CustomEvent('popular', {
      bubbles: true,
      detail: {
        curType: 'popular',
      },
    }),
  );

  return {
    render: () => $main,
  };
};

export default Main;
