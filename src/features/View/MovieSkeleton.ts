export default class MovieSkeleton {
  render(): HTMLLIElement {
    const li = document.createElement("li");
    li.innerHTML = `<div class="movie-skeleton">
      <div class="movie-skeleton__poster"></div>
      <div class="movie-skeleton__details">
       <div class="movie-skeleton__title"></div>
       <div class="movie-skeleton__info"></div>
      </div>
    </div>
    `;
    return li;
  }
}
