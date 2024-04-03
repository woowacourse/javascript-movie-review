import { Optional } from "../../types/utility";

export default class MovieListPage {
  private static MAX_PAGE = 10;

  private currentPage: Optional<number>;

  constructor(page: number) {
    this.currentPage = page;
  }

  public isEndPage() {
    if (!this.currentPage) return;

    return this.currentPage > MovieListPage.MAX_PAGE;
  }

  public setPage(page: number) {
    this.currentPage = page;
  }

  public getPage() {
    return this.currentPage;
  }
}
