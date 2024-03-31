import {
  Header,
  MovieListContainer,
  SkeletonListContainer,
} from './components';
import { MovieListContainerProps } from './components/movie/MovieListContainer';
import { dataStateStore, movieListDataFetcher } from './model';
import { ElementFinder, WindowResponsiveHandler } from './utils';

const popularMovieListContainerProps: Omit<
  MovieListContainerProps,
  'movieData'
> = {
  titleText: '지금 인기 있는 영화',
  listType: 'popular',
};

async function App() {
  const $app = ElementFinder.findElementBySelector('#app');
  if (!$app) return;

  $app.prepend(new Header().element);
  WindowResponsiveHandler.handleWindowResize();
  new SkeletonListContainer();
  await movieListDataFetcher.handleGetPopularMovieData();
  new MovieListContainer({
    ...popularMovieListContainerProps,
    movieData: dataStateStore.movieData,
  });
}

export default App;
