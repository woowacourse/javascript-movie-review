class MovieDetail {
  $dialog = document.createElement("dialog");

  constructor($target, movie) {
    this.init(movie);

    this.render($target, movie);
  }

  init(movie) {
    this.$dialog.classList = "";
    this.$dialog.innerHTML = this.getTemplate(movie);
  }

  render($target) {
    // $target === $app
    $target.insertAdjacentHTML("afterbegin", this.$dialog);
  }

  getTemplate() {
    const template = ``;

    return template;
  }
}

export default MovieDetail;
