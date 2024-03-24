import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';
import Modal from './components/Modal/Modal';
import MovieDetail from './components/MovieDetail/MovieDetali';

const body = document.querySelector('body');

const getPopularMovies = () => {
  movieItems.resetMovieItems();
  movieItems.showMore();
};

const getMatchedMovies = (event: SubmitEvent) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const searchKeyword = Array.from(formData.values())[0];

  movieItems.resetMovieItems(searchKeyword.toString());
  movieItems.showMore();
};

const header = new Header({ onLogoClick: getPopularMovies, onSearch: getMatchedMovies });
const movieItems = new MovieItems();

const movieDetail = new MovieDetail();
const modal = new Modal({ content: movieDetail.element });

body?.appendChild(header.element);
body?.appendChild(movieItems.element);
body?.appendChild(modal.element);

body?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('movie-item')) {
    modal.toggleModal();
  }
});
