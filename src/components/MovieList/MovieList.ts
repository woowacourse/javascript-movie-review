import MovieItem from '../MovieItem/MovieItem';
import { Movie } from './../../types/movie';

class MovieList {
  movieList: Movie[];

  constructor(movieList: Movie[]) {
    this.movieList = movieList;
    this.render();
  }

  render() {
    const movieListBox = document.createElement('ul');
    movieListBox.classList.add('item-list');

    const fragment = new DocumentFragment();
    this.movieList.forEach(movie => {
      const moveItemTemplate = new MovieItem(movie).template();
      fragment.append(moveItemTemplate);
    });

    movieListBox.append(fragment);

    const parent = document.querySelector('.item-view');
    if (!parent) return;
    parent.append(movieListBox);
  }
}

export default MovieList;
