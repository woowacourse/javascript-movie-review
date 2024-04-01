import headerManager from './components/Header/Header';
import movieScoreManager, { MovieScoreEvent } from './components/Modal/ScoreCheckbox';
import movieContentManager from './components/MovieContents/MovieContents';
import { LOGO } from './images/index';
import storage from './storage';
import { PropsType } from './types/props';
import DOM from './utils/DOM';

const { $ } = DOM;

class MovieApp {
  constructor() {
    this.start();
    this.renderPopularMovie();
    this.listenModalOpen();
    this.listenMovieScore();
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

  listenModalOpen() {
    document.addEventListener('openModal', (event: Event) => {
      const scoreEvent = event as MovieScoreEvent;
      const movieInfo = scoreEvent.detail.movie;

      const existData = storage.getData().find((data) => data.movie.title === movieInfo.title);
      if (existData) {
        movieScoreManager.updateMovieScoreUI(existData.score);
      }
    });
  }

  listenMovieScore() {
    document.addEventListener('selectMovieScore', (event: Event) => {
      const scoreEvent = event as MovieScoreEvent;
      const movieInfo = scoreEvent.detail.movie;
      const movieScore = scoreEvent.detail.score;

      storage.setData({ movie: movieInfo, score: movieScore });
    });
  }
}

export default MovieApp;
