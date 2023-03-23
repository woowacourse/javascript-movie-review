const MovieDetailModal = {
  template(movie) {
    return `
    <div class="movie-detail">
     ${movie.title}
    </div>
    `;
  },

  render(movie) {
    const $modalContainer = document.querySelector(".modal-container");

    $modalContainer.innerHTML = this.template(movie);
  },
};

export default MovieDetailModal;
