import Header from './components/Header';
import MovieList from './components/MovieList';

const $ = (selector) => document.querySelector(selector);

const App = {
  render() {
    new Header($('#app')).render();
    new MovieList($('main')).render();
  },
};

export default App;
