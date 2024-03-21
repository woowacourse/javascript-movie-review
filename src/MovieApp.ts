import createHeader from './components/Header/Header';
import createMovieContents from './components/MovieContents/MovieContents';
import { LOGO } from './images/index';
import { PropsType } from './types/props';

class MovieApp {
  constructor() {
    this.init();
    this.render();
  }

  async init() {
    const container = document.querySelector('#app');
    const header = createHeader({
      imageSource: LOGO,
    });
    const main = await createMovieContents.execute();

    container?.prepend(header);
    container?.appendChild(main);
  }

  render() {
    const props: PropsType = {
      type: 'popular',
      input: '',
    };
    createMovieContents.renderMovieData(props);
  }
}

export default MovieApp;
