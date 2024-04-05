class MoviePage {
  page: number = 1;

  isLastPage: boolean = false;

  isLoading: boolean = false;

  getPage(): number {
    return this.page;
  }

  resetPage() {
    this.page = 1;
  }

  updatePage() {
    this.page += 1;
  }

  resetIsLastPage() {
    this.isLastPage = false;
  }
}

export default MoviePage;
