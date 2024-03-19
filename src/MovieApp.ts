import createHeader from './components/Header/Header';
import { LOGO } from './images/index';

class MovieApp {
  constructor() {
    this.init();
  }

  init() {
    const header = createHeader({
      imageSource: LOGO,
      // onButtonClick: () => addingRestaurantModal.toggle(),
    });

    const container = document.querySelector('#app');
    container?.prepend(header);
  }
}

export default MovieApp;
