import HeaderManager from './components/Header/Header';
import MovieContentManager from './components/MovieContents/MovieContents';
import { LOGO } from './images/index';
import { PropsType } from './types/props';
import DOM from './utils/DOM';

const { $ } = DOM;

class MovieApp {
  constructor() {
    this.start();
    this.renderPopularMovie();
  }

  start() {
    const container = $('#app');
    const header = HeaderManager.render({
      imageSource: LOGO,
    });
    const main = MovieContentManager.renderMain('지금 인기 있는 영화');

    container?.appendChild(header);
    container?.appendChild(main);
  }

  renderPopularMovie() {
    const props: PropsType = {
      type: 'popular',
      input: '',
    };
    MovieContentManager.renderMovieData(props);
  }
}

export default MovieApp;
