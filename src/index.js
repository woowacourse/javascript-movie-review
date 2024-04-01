import MovieReviewApp from './MovieReviewApp';

import './common.style.css';
import './reset.style.css';

import './component/MovieReviewHeader/movieReviewHeader.style.css';
import './component/MovieSearchInput/movieSearchInput.style.css';
import './component/MovieList/movieList.style.css';
import './component/MovieItem/movieItem.style.css';
import './component/MovieModal/movieModal.style.css';

const movieReviewApp = new MovieReviewApp();

movieReviewApp.render();
