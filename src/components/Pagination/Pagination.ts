class Pagination {
  private currentPage: number;

  private isLast: boolean;

  constructor() {
    this.currentPage = 0;
    this.isLast = false;
  }

  resetPage() {
    this.currentPage = 0;
    this.isLast = false;
  }

  goNextPage() {
    this.currentPage += 1;
  }

  get curPage() {
    return this.currentPage;
  }

  get last() {
    return this.isLast;
  }

  checkLastPage(totalPage: number) {
    this.isLast = this.currentPage >= totalPage;
  }
}

export default Pagination;
