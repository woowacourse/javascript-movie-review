import {
  Header,
  MovieListContainer,
  SkeletonListContainer,
} from './components';
import dataStateStore from './model/DataStateStore';
import { DataFetcher, SkeletonController } from './service';

async function App() {
  const $app = document.querySelector('#app');
  $app?.prepend(new Header().element);
  new SkeletonListContainer();
  const dataFetcher = new DataFetcher({
    show: SkeletonController.showSkeleton,
    hide: SkeletonController.hideSkeleton,
  });
  await dataFetcher.handleGetPopularMovieData();
  new MovieListContainer({
    titleText: '지금 인기 있는 영화',
    movieData: dataStateStore.movieData,
    listType: 'popular',
  });
}

export default App;
