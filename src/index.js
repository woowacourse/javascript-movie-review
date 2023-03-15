import './style/common';
import './style/reset';
import Header from './components/Header';
import MovieList from './components/MovieList';

class App {
  constructor() {
    const $app = document.querySelector('#app');
    this.header = new Header($app);
    this.movieList = new MovieList($app);
  }

  init() {
    this.header.render();
    this.movieList.render();
  }
}

const app = new App();
app.init();
