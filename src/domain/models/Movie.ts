interface MovieDTO {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
  overview: string;
}

export default class Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
  overview: string;

  constructor(movieData: MovieDTO) {
    this.id = movieData.id;
    this.title = movieData.title;
    this.posterPath = movieData.posterPath;
    this.voteAverage = movieData.voteAverage;
    this.overview = movieData.overview;
  }

  getPosterUrl(): string {
    if (this.posterPath === "") {
      return "./images/nullImage.png";
    }
    return `https://image.tmdb.org/t/p/w500/${this.posterPath}`;
  }

  getVoteAverage(): string {
    return this.voteAverage.toFixed(1);
  }

  render(): HTMLElement {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");

    movieElement.innerHTML = `
      <img src="${this.getPosterUrl()}" alt="${this.title}">
      <h3>${this.title}</h3>
      <p>평점: ${this.getVoteAverage()}</p>
    `;

    return movieElement;
  }
}
