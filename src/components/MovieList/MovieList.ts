import MovieItem from '../MovieItem/MovieItem';
import { movieListMock } from './../../mock/movieList.mock';
import { Movie } from './../../types/movie';

class MovieList {
  movieList;

  constructor(movieList: Movie[]) {
    this.movieList = movieList;
    this.render();
  }

  render() {
    const movieListBox = document.createElement('ul');
    movieListBox.classList.add('item-list');

    const fragment = new DocumentFragment();
    console.log('movieList', this.movieList);
    this.movieList.forEach(movie => {
      const moveItemTemplate = new MovieItem(movie).template();
      fragment.append(moveItemTemplate);
    });

    movieListBox.append(fragment);

    const parent = document.querySelector('.popular-movie');
    if (!parent) return;
    parent.append(movieListBox);
  }
}

export default MovieList;
