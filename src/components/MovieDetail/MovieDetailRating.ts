import Component from '../../types/component';

class MovieDetailRating implements Component {
  node: HTMLElement;
  genres: string[];
  voteAverage: number;

  constructor(genres: string[], voteAverage: number) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-rating');
    this.genres = genres;
    this.voteAverage = voteAverage;

    this.composeNode();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <p>${this.genres.join(' ')}</p>
      <img src="./star_filled.png" alt="별점" />
      <p>${this.voteAverage}</p>
    `;

    return this;
  }
}

export default MovieDetailRating;
