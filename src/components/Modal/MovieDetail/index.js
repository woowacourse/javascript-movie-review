const MovieDetailModal = {
  template(id) {
    return `
    <div class="movie-detail">
     ${id}
    </div>
    `;
  },

  render(id) {
    const $modalContainer = document.querySelector(".modal-container");

    $modalContainer.innerHTML = this.template(id);
  },
};

export default MovieDetailModal;
