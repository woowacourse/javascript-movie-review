import { $, $OptionalSelector } from '../../util/selector';
import createButton from '../Button/Button';
import { injectMovieDataToItem } from '../MovieItem/MovieItem';
import { createSkeletonMovieList } from '../MovieList/MovieList';
import { MoviePageData } from '../../interface/MovieInterface';
import ASSETS from '../../constant/assets';

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
      callbackFunction: () => this.initHandleClickMoreButton(),
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
    const emptyResultContainer = document.createElement('div');
    emptyResultContainer.classList.add('empty-result');

    const emptyResultImage = document.createElement('img');
    emptyResultImage.src = ASSETS.resultEmptyImage;

    const emptyResultHeader = document.createElement('p');
    const emptyResultDescription = document.createElement('p');
    emptyResultHeader.textContent = '검색 결과가 없습니다.';
    emptyResultDescription.textContent = '다른 검색어로 다시 검색해주세요.';

    emptyResultContainer.append(emptyResultImage, emptyResultHeader, emptyResultDescription);
    return emptyResultContainer;
  }

  removeSkeleton() {
    this.skeletonList.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  setEmptySearchResult(listLength: number) {
    const emptySearchResultParagraph = $OptionalSelector('div.empty-result');

    if (listLength > 0) {
      emptySearchResultParagraph?.remove();
    }

    if (listLength <= 0 && !emptySearchResultParagraph) {
      $('.item-view').appendChild(this.createEmptySearchResult());
    }
  }

  fillMovieDataToSkeletonList(
    { movieList, hasNextPage }: MoviePageData,
    onClick: (item: HTMLLIElement, movieId: number) => void,
  ) {
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
      callbackFunction: () => handleRetryButton(),
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
