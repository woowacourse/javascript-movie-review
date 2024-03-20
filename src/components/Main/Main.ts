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
  const movies = [...data.results].map(
    ({ id, title, vote_average, poster_path }) => ({
      id,
      title,
      vote_average,
      poster_path,
    }),
  );
  return movies;
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
  const movies = [...data.results].map(
    ({ id, title, vote_average, poster_path }) => ({
      id,
      title,
      vote_average,
      poster_path,
    }),
  );
  return movies;
};

const Main = () => {
  document.addEventListener('search', (e) => {
    const { detail } = e as CustomEvent;

    fetchSearchMovies({ query: detail.query })
      .then((movies) => {
        movieStore.setMovies(movies, () => renderMovieList('검색결과'));
      })
      .catch(() => {
        const $ul = document.querySelector('.item-view ul') as HTMLElement;
        const $h2 = document.querySelector('.item-view h2') as HTMLElement;
        const $itemView = document.querySelector('.item-view');
        $itemView?.removeChild($ul);
        $itemView?.removeChild($h2);
      });
  });

  document.addEventListener('popular', () => {
    fetchPopularMovies({ page: 1 })
      .then((movies) => {
        movieStore.setMovies(movies, () =>
          renderMovieList('지금 인기있는 영화'),
        );
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
