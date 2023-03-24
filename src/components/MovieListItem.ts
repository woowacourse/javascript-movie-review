import { Movie } from '../movies.type';

class MovieListItem {
  constructor(private readonly movie: Movie) {}

  private li = document.createElement('li');

  private template = (movie: Movie) => `
    <a>
      <div class="item-card" id="${movie.id}">
        <img
          class="item-thumbnail skeleton"
          src="${
            movie.poster_path
              ? 'https://image.tmdb.org/t/p/w220_and_h330_face' + movie.poster_path
              : 'assets/no_image.png'
          }"
          loading="lazy"
          alt="${movie.title}"
        />
        <p class="item-title">${movie.title}</p>
        <p class="item-score">${
          movie.vote_average
        }<img src="assets/star_filled.png" alt="별점" /> </p>
      </div>
    </a>
`;

  render() {
    if (this.movie.poster_path)
      document.querySelectorAll('.item-thumbnail')?.forEach((thumbnail) => {
        thumbnail.classList.remove('skeleton');
      });
    this.li.innerHTML = this.template(this.movie);
    return this.li;
  }
}

export default MovieListItem;
