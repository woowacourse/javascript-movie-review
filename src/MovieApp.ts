import headerManager from './components/Header/Header';
import movieScoreManager from './components/Modal/ScoreCheckbox';
import movieContentManager from './components/MovieContents/MovieContents';
import { LOGO } from './images/index';
import storage from './storage';
import { MovieScore } from './types/movie';
import { PropsType } from './types/props';
import DOM from './utils/DOM';
import { listenCustomEvent } from './utils/customEvent';

const { $ } = DOM;

class MovieApp {
  constructor() {
    this.start();
    this.renderPopularMovie();
    this.listenEvents();
  }

  start() {
    const container = $('#app');
    const header = headerManager.render({
      imageSource: LOGO,
    });
    const main = movieContentManager.renderMain('지금 인기 있는 영화');

    container?.appendChild(header);
    container?.appendChild(main);
  }

  renderPopularMovie() {
    const props: PropsType = {
      type: 'popular',
      input: '',
    };
    movieContentManager.renderMovieData(props);
  }

  listenEvents() {
    listenCustomEvent<MovieScore>('openModal', this.handleModalOpenEvent);
    listenCustomEvent<MovieScore>('selectMovieScore', this.handleMovieScoreEvent);
  }

  handleModalOpenEvent(event: CustomEvent<MovieScore>) {
    const eventData = event.detail;
    const existData = storage.getData().find((data) => data.movie.title === eventData.movie.title);
    if (existData) {
      movieScoreManager.updateMovieScoreUI(existData.score!);
    }
  }

  handleMovieScoreEvent(event: CustomEvent<MovieScore>) {
    const eventData = event.detail;
    storage.setData({ movie: eventData.movie, score: eventData.score });
  }
}

export default MovieApp;
