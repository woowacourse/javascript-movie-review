import createHeader from './components/Header/Header';
import createMovieContents from './components/MovieContents/MovieContents';
import { LOGO } from './images/index';

class MovieApp {
  constructor() {
    this.init();
  }

  async init() {
    const header = createHeader({
      imageSource: LOGO,
    });

    const main = await createMovieContents.execute();

    const container = document.querySelector('#app');

    container?.prepend(header);
    container?.appendChild(main);
  }
}

export default MovieApp;
