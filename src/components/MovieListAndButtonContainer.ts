import { $ } from '../utils/domSelector';

class MovieListAndButtonContainer {
  private $container = $('.item-view');

  renderMovieListTitle(listTitleTemplate: string) {
    this.$container.insertAdjacentHTML('beforeend', listTitleTemplate);
  }

  renderLoadMoreButton(buttonTemplate: string) {
    this.$container.insertAdjacentHTML('beforeend', buttonTemplate);
  }
}

export default MovieListAndButtonContainer;
