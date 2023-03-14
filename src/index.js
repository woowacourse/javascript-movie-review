// import Movie from './domain/Movie';
import '../templates/reset.css';
import '../templates/common.css';

import App from './App';

// const movie = new Movie();
// const getMovie = async () => {
//   console.log(await movie.getPopularMovies());
//   console.log(await movie.findMovies('점퍼'));
// };

// getMovie();

new App(document.getElementById('app'));
