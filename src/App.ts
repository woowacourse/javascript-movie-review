  async renderPopularMovies() {
    showSkeleton();
    const popularMovies = await fetchPopularMovies(this.currentPage);
    hideSkeleton();
    this.updatePage(movieService.resultsToMovies(popularMovies));
  },

  async renderSearchedMovies() {
    showSkeleton();
    const searchedMovies = await fetchSearchedMovies(this.query, this.currentPage);
    hideSkeleton();
    this.updatePage(movieService.resultsToMovies(searchedMovies));
  },

  updatePage(newMovies: Movie[]) {
    if (newMovies.length < MAX_MOVIES_PER_PAGE) hideLoadMoreButton();

    this.currentPage += 1;
    renderList(newMovies);
  },
