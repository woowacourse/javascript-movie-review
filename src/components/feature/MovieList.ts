import { movieFetcher } from '../../domain/MovieFetcher';
import { movieFetcherEvent } from '../../domain/MovieFetcherEvent';
import { MovieItem as MovieItemType } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Button } from '../common/Button';
import { Text } from '../common/Text';
import { MovieItem } from './MovieItem';

export const MovieList = async () => {
  let isSearch = movieFetcher.getSearchState();
  await movieFetcher.getPopularMovies(1);
  const movieResponse = movieFetcher.getCurrentMovieResponse();

  const mainElement = createElement<HTMLDivElement>('main');
  const sectionElement = createElement<HTMLDivElement>('section', {
    classList: 'container',
  });

  const text = Text({
    classList: ['text-2xl', 'font-bold', 'mb-32'],
    props: {
      textContent: '인기 있는 영화',
    },
  });

  const movieUl = createElement<HTMLUListElement>('ul', {
    classList: 'thumbnail-list',
  });

  const renderMovieList = () => {
    movieUl.innerHTML = '';
    isSearch = movieFetcher.getSearchState();
    const currentResponse = movieFetcher.getCurrentMovieResponse();
    const currentResult = movieFetcher.getMovieResult();
    const movieElements = currentResult.map((movie: MovieItemType) => {
      return MovieItem({ ...movie });
    });

    movieUl.append(...movieElements);

    if (currentResponse.page === currentResponse.total_pages) {
      moreBtn.style.display = 'none';
    }

    if (isSearch) {
      text.textContent = `검색 결과: ${movieFetcher.getQuery()}`;
    }
  };

  movieFetcherEvent.subscribe(renderMovieList);

  if (movieResponse.results) {
    const movieElements = movieResponse.results.map((movie: MovieItemType) => {
      return MovieItem({ ...movie });
    });
    movieUl.append(...movieElements);
  }

  const moreBtn = Button({
    type: 'button',
    onClick: async () => {
      if (movieResponse.page < movieResponse.total_pages) {
        moreBtn.disabled = true;
        moreBtn.textContent = '로딩 중...';

        isSearch
          ? await movieFetcher.getNextPageSearchMovies()
          : await movieFetcher.getNextPagePopularMovies();

        renderMovieList();
        moreBtn.disabled = false;
        moreBtn.textContent = '더보기';
      }
    },
    classList: ['w-full', 'primary'],
    props: {
      textContent: '더보기',
    },
  });

  mainElement.append(sectionElement);
  sectionElement.append(text, movieUl, moreBtn);

  const app = document.querySelector('#app');

  if (app?.firstChild) {
    app.insertBefore(mainElement, app.firstChild.nextSibling);
  }
  if (!app?.firstChild) {
    app?.appendChild(mainElement);
  }

  return mainElement;
};
