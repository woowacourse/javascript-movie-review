import Header from './components/Header';
import MovieDetailModal from './components/MovieDetailModal';
import MovieListAndButtonContainer from './components/MovieListAndButtonContainer';

class App {
  private header = new Header();
  private movieListAndButtonContainer = new MovieListAndButtonContainer();
  private movieDetailModal = new MovieDetailModal();
}

export default App;
