import Header from './components/Header';
import MovieDetailModal from './components/MovieDetailModal';
import MovieListContainer from './components/MovieListContainer';

class App {
  private header = new Header();
  private movieListContainer = new MovieListContainer();
  private movieDetailModal = new MovieDetailModal();
}

export default App;
