import { $ } from '../../utils/dom';
import MovieContainer from '../../components/MovieContainer';
import CardList from '../../components/shared/CardList';
import { MainComponents } from '../../types/main';
import Button from '../../components/shared/Button';
import { Proxy } from '../../types/proxy';

class Main {
  private components: MainComponents = {
    movieContainer: null,
    movieList: null,
    moreButton: null,
  };

  private proxy: Proxy = {
    query: { value: '', isSearch: false },
    moreButton: { isClick: false, currentPage: 1, isSearch: false },
  };

  constructor({ movieContainer, movieList, moreButton }: MainComponents, proxy: Proxy) {
    this.components = { movieContainer, movieList, moreButton };
    this.proxy = proxy;
  }

  render() {
    const appElement = $<HTMLDivElement>('#app');

    if (appElement instanceof HTMLDivElement && appElement.closest('body')) {
      appElement.insertAdjacentHTML('beforeend', '<main></main>');
      this.renderChild();
      this.listenEvent('click');
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

  private callback(event: Event) {
    if (event.target instanceof HTMLButtonElement && event.target.matches('#moreButton')) {
      this.proxy.moreButton.isClick = true;
    }
  }

  private listenEvent(type: string) {
    const mainElement = $<HTMLElement>('main');

    if (mainElement instanceof HTMLElement) {
      mainElement.addEventListener(type, this.callback.bind(this));
    }
  }
}

export default Main;
