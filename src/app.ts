import {
  Header,
  MovieListContainer,
  SkeletonListContainer,
} from './components';
import { MovieListContainerProps } from './components/movie/MovieListContainer';
import { WindowResponsiveHandler } from './controller';
import { dataStateStore, movieListDataFetcher } from './model';

const popularMovieListContainerProps: Omit<
  MovieListContainerProps,
  'movieData'
> = {
  titleText: '지금 인기 있는 영화',
  listType: 'popular',
};

async function App() {
  const $app = document.querySelector('#app');
  $app?.prepend(new Header().element);
  WindowResponsiveHandler.handleWindowResize();
  new SkeletonListContainer();

  await movieListDataFetcher.handleGetPopularMovieData();
  new MovieListContainer({
    ...popularMovieListContainerProps,
    movieData: dataStateStore.movieData,
  });
}

export default App;
