import {
  Header,
  MovieListContainer,
  SkeletonListContainer,
} from './components';
import { MovieListContainerProps } from './components/movie/MovieListContainer';
import dataStateStore from './model/DataStateStore';
import {
  DataFetcher,
  SkeletonController,
  WindowResponsiveHandler,
} from './service';

const dataFetcher = new DataFetcher({
  show: SkeletonController.showListSkeletonContainer,
  hide: SkeletonController.hideSkeletonListContainer,
});

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

  await dataFetcher.handleGetPopularMovieData();
  new MovieListContainer({
    ...popularMovieListContainerProps,
    movieData: dataStateStore.movieData,
  });
}

export default App;
