import {
  REQUEST_URL,
  COMMON_OPTIONS,
  COMMON_PARAMS,
} from '../../constants/requests';
import movieStore from '../../stores/movieStore';
import fetchData from '../../utils/fetchData';
import renderMovieList from '../../utils/renderMovieList';
import MovieList from '../MovieList/MovieList';

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
  document.addEventListener('search', (e) => {
    const { detail } = e as CustomEvent;
    if (detail.curType !== 'search') movieStore.setPage(1);

    fetchSearchMovies({ query: detail.query, page: movieStore.page })
      .then(({ movies, page }) => {
        if (page !== 1) {
          movieStore.setMovies([...movieStore.movies, ...movies], () =>
            renderMovieList({
              title: `\"${detail.query}\" 검색 결과`,
              type: 'search',
            }),
          );
          movieStore.setPage(page + 1);
        } else {
          movieStore.setMovies(movies, () =>
            renderMovieList({
              title: `\"${detail.query}\" 검색 결과`,
              type: 'search',
            }),
          );
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

    fetchPopularMovies({ page: movieStore.page })
      .then(({ movies, page }) => {
        if (page !== 1) {
          movieStore.setMovies([...movieStore.movies, ...movies], () =>
            renderMovieList({
              title: '지금 인기있는 영화',
              type: 'popular',
            }),
          );
          movieStore.setPage(page + 1);
        } else {
          movieStore.setMovies(movies, () =>
            renderMovieList({
              title: '지금 인기있는 영화',
              type: 'popular',
            }),
          );
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

  return {
    render: () => {
      const $main = document.createElement('main');
      const $movieList = MovieList().render();
      $main.appendChild($movieList);
      return $main;
    },
  };
};

export default Main;
