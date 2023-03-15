import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';

class App {
  constructor() {
    const $app = document.querySelector('#app');
    this.header = new Header($app);
    this.movieList = new MovieList($app);
  }

  async init() {
    this.header.render();
    await this.movieList.render();
  }
}

const app = new App();
app.init();
