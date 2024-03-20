import MovieItem from '../components/MovieItem/MovieItem';
import movieStore from '../stores/movieStore';

type ButtonType = 'popular' | 'search';
interface Props {
  title: string;
  type: ButtonType;
}

const renderMovieList = ({ title, type }: Props) => {
  const $movieList = document.querySelector('.item-view') as HTMLElement;

  const $ul = $movieList.querySelector('ul') as HTMLElement;
  $ul.textContent = '';

  const $title = $movieList.querySelector('h2') as HTMLElement;
  $title.textContent = title;

  const $loadMoreBtn = $movieList.querySelector('button') as HTMLElement;
  $loadMoreBtn.setAttribute('list-type', type);

  movieStore.movies.forEach((movie) => {
    const $movieItem = MovieItem(movie).render();
    $ul.appendChild($movieItem);
  });
};

export default renderMovieList;
