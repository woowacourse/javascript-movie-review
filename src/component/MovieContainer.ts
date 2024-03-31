import { $, $OptionalSelector } from '../util/selector';
import createButton from './Button';
import { injectMovieDataToItem } from './MovieItem';
import { createSkeletonMovieList } from './MovieList';
import { MoviePageData } from '../interface/MovieInterface';

interface MovieContainerParams {
  title: string;
  handleMoreButton: () => Promise<void>;
}

class MovieContainer {
  private movieListContainer: HTMLUListElement;
  private sectionTitle: HTMLHeadingElement;
  private skeletonList: HTMLLIElement[];
  private moreButton: HTMLButtonElement;
  private handleMoreButton: () => Promise<void>;

  constructor({ title, handleMoreButton }: MovieContainerParams) {
    this.movieListContainer = $<HTMLUListElement>('ul.item-list');
    this.sectionTitle = $<HTMLHeadingElement>('.item-view > h2');
    this.sectionTitle.textContent = title;
    this.skeletonList = [];
    this.handleMoreButton = handleMoreButton;
    this.moreButton = createButton({
      options: {
        type: 'button',
        id: 'more-button',
        textContent: '더 보기',
        variantClasses: ['full-width', 'primary'],
      },
      eventType: {
        type: 'click',
        callbackFunction: () => this.initHandleClickMoreButton(),
      },
    });
    this.toggleMoreButtonDisplay(false);

    $('section').append(this.moreButton);
  }

  createSkeletonList() {
    this.removeRetryButton();
    const skeletonMovieList = createSkeletonMovieList();

    skeletonMovieList.forEach((skeletonMovie) => {
      this.movieListContainer.appendChild(skeletonMovie);
    });

    this.skeletonList = skeletonMovieList;
    this.toggleMoreButtonDisplay(false);
    this.removeRetryButton();
  }

  createEmptySearchResult() {
    const emptySearchResult = document.createElement('h3');
    emptySearchResult.classList.add('empty-search-result');
    emptySearchResult.textContent = '검색 결과가 없습니다.';
    return emptySearchResult;
  }

  removeSkeleton() {
    this.skeletonList.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  setEmptySearchResult(listLength: number) {
    const emptySearchResultParagraph = $OptionalSelector('h3.empty-search-result');

    if (listLength !== 0) {
      emptySearchResultParagraph?.remove();
    }

    if (listLength === 0 && !emptySearchResultParagraph) {
      $('.item-view').insertBefore(this.createEmptySearchResult(), this.movieListContainer);
    }
  }

  fillMovieDataToSkeletonList({ movieList, hasNextPage }: MoviePageData, onClick: (movieId: number) => void) {
    this.setEmptySearchResult(movieList.length);

    this.skeletonList.forEach((item, i) => {
      if (i >= movieList.length) return item.remove();
      injectMovieDataToItem({ item, movie: movieList[i].data, onClick });
    });

    this.toggleMoreButtonDisplay(hasNextPage);
    this.skeletonList = [];
  }

  toggleMoreButtonDisplay(hasNextPage: boolean) {
    this.moreButton.style.display = hasNextPage ? 'block' : 'none';
  }

  clearMovieList() {
    this.movieListContainer.replaceChildren();
  }

  createRetryButton(handleRetryButton: () => Promise<void>) {
    const retryButton = createButton({
      options: {
        type: 'button',
        id: 'retry-button',
        textContent: '다시 불러오기 ↻',
        variantClasses: ['full-width', 'primary'],
      },
      eventType: {
        type: 'click',
        callbackFunction: () => handleRetryButton(),
      },
    });
    $('.item-view').insertBefore(retryButton, $('ul.item-list'));
  }

  removeRetryButton() {
    $OptionalSelector('#retry-button')?.remove();
  }

  async initHandleClickMoreButton() {
    await this.handleMoreButton();
  }

  setTitle(title: string) {
    this.sectionTitle.textContent = title;
  }
}

export default MovieContainer;
