const MovieSectionTitle = {
  template(query: string = '') {
    return `<h2 class="movie-section-title">${query === '' ? '지금 인기있는 영화' : `"${query}" 검색 결과`}</h2>`;
  },
};

export default MovieSectionTitle;
