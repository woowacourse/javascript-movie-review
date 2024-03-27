import { MOVIE_LIST_TYPE } from '../constant/config';

class PageNumberManager {
  private pageType: keyof typeof MOVIE_LIST_TYPE | null;
  private pageNumber: number;

  constructor() {
    this.pageType = null;
    this.pageNumber = 1;
  }

  setPageType(type: keyof typeof MOVIE_LIST_TYPE) {
    this.pageType = type;
    this.pageNumber = 1;
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber = pageNumber;
  }

  getPageType() {
    return this.pageType;
  }

  getPageNumber() {
    return this.pageNumber;
  }

  increase() {
    this.pageNumber += 1;
  }

  clear() {
    this.pageNumber = 1;
  }
}

export default PageNumberManager;
