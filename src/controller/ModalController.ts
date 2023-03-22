import MovieStorage from '../domains/MovieStorage';
import EventBus from '../EventBus';

class ModalController {
  constructor() {
    EventBus.setEvent('openInfoModal', this.openInfoModalWithMovieId);
    console.log('set event');
  }

  openInfoModalWithMovieId(movieId: number) {
    const movieInfo = MovieStorage.getMovieById(movieId);
    alert('영화 정보:' + JSON.stringify(movieInfo));

    console.log(`${movieId} 번 영화의 정보입니다.`);
    console.log(movieInfo);
  }
}

export default ModalController;
