import TMDB_ERRORS from '../constants/tmdbErrors';
import { $ } from '../utils/domUtils';

class DomController {
  public static state = {
    $listTitle: <HTMLHeadingElement>{},
    $movieListSkeleton: <HTMLUListElement>{},
    $moreButton: <HTMLButtonElement>{}
  };

  /* Dom 로딩 후 반드시 초기화 한다. */
  public static initController() {
    const $listTitle = $<HTMLHeadingElement>('.item-view h2')!;
    const $movieListSkeleton = $<HTMLUListElement>('.item-list.skeleton')!;
    const $moreButton = $<HTMLButtonElement>('.item-view button')!;

    DomController.state = {
      $listTitle,
      $movieListSkeleton,
      $moreButton
    };
  }

  public static updateListTitle(query: string) {
    this.state.$listTitle.textContent = `"${query}" 검색 결과`;
  }

  public static printErrorMessage(statusCode: number) {
    const error = TMDB_ERRORS[statusCode];
    this.state.$listTitle.textContent = `[Error ${error.httpStatus}] ${error.message}`;
  }

  public static printMovieNotFoundMessage(query: string = '') {
    if (query) {
      this.state.$listTitle.textContent = `"${query}"에 대한 검색 결과가 없습니다.`;
    } else {
      this.state.$listTitle.textContent = '조회 결과가 없습니다.';
    }
  }

  public static hideMovieListSkeleton() {
    this.state.$movieListSkeleton.classList.add('hidden');
  }

  public static showMovieListSkeleton() {
    this.state.$movieListSkeleton.classList.remove('hidden');
  }

  public static hideMoreButton() {
    this.state.$moreButton.classList.add('hidden');
  }

  public static showMoreButton() {
    this.state.$moreButton.classList.remove('hidden');
  }
}

export default DomController;
