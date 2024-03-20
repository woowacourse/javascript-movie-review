import httpRequest from '../../api/httpRequest';
import { MovieListType, MovieType } from '../../types/movie';
import createMovieItems from '../MovieItems/MovieItems';
import './style.css';

// eslint-disable-next-line max-lines-per-function
const createMovieContents = async () => {
  const movieList: MovieListType = await httpRequest
    .fetchPopularMovies(1)
    .then((popularMovieList) =>
      popularMovieList.map((movie: MovieType) => ({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        vote_average: movie.vote_average,
      })),
    )
    .catch((error) => console.error(error));

  const main = document.createElement('main');
  const templates =
    /* html */
    `
    <section class="item-view">
      <h2>지금 인기 있는 영화</h2>
    </section>
    `;

  main.innerHTML = templates;

  const movieItems = createMovieItems(movieList);
  main.querySelector('.item-view')?.appendChild(movieItems);

  return main;
};

export default createMovieContents;
