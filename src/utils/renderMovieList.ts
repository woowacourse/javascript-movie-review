import MovieItem from '../components/MovieItem/MovieItem';
import movieStore from '../stores/movieStore';

const renderMovieList = (title: string) => {
  const $ul = document.querySelector('.item-view ul') as HTMLElement;
  $ul.textContent = '';
  const $title = document.querySelector('h2') as HTMLElement;
  $title.textContent = title;

  movieStore.movies.forEach((movie) => {
    const $movieItem = MovieItem(movie).render();
    $ul.appendChild($movieItem);
  });
};

export default renderMovieList;
