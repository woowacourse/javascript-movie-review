import { $ } from '../../utils/dom';
import MovieContainer from '../../components/MovieContainer';
import CardList from '../../components/shared/CardList';
import { MainComponents } from '../../types/main';
import Button from '../../components/shared/Button';

class Main {
  components: MainComponents = {
    movieContainer: null,
    movieList: null,
    moreButton: null,
  };

  constructor(movieContainer: MovieContainer, movieList: CardList, moreButton: Button) {
    this.components.movieContainer = movieContainer;
    this.components.movieList = movieList;
    this.components.moreButton = moreButton;
  }

  render() {
    const appElement = $<HTMLDivElement>('#app');

    if (appElement instanceof HTMLDivElement && appElement.closest('body')) {
      appElement.insertAdjacentHTML('beforeend', '<main></main>');
      this.renderChild();
    }
  }

  private renderChild() {
    const mainElement = $<HTMLElement>('main');

    if (
      mainElement instanceof HTMLElement &&
      mainElement.closest('body') &&
      this.components.movieContainer instanceof MovieContainer
    ) {
      this.components.movieContainer.render(mainElement);
      const movieContainerElement = $<HTMLElement>('section');

      if (
        movieContainerElement instanceof HTMLElement &&
        movieContainerElement.closest('main') &&
        this.components.movieList instanceof CardList &&
        this.components.moreButton instanceof Button
      ) {
        this.components.movieList.render(movieContainerElement);
        this.components.moreButton.render(movieContainerElement);
      }
    }
  }
}

export default Main;
