import Header from './components/Header';
import MovieListContainer from './components/MovieListContainer';
import SkeletonListContainer from './components/skeleton/SkeletonListContainer';
import dataStateStore from './model/DataStateStore';
import DataFetcher from './service/DataFetcher';

async function App() {
  const $app = document.querySelector('#app');
  $app?.prepend(new Header().element);
  new SkeletonListContainer();
  await DataFetcher.handleGetPopularMovieData();
  new MovieListContainer({
    titleText: '지금 인기 있는 영화',
    movieData: dataStateStore.movieData,
    listType: 'popular',
  });
}

export default App;
