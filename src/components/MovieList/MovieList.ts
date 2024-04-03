import './MovieList.css';
import movieStore from '../../stores/movieStore';
import throttle from '../../utils/throttle';
import MovieItem from '../MovieItem/MovieItem';

const getSearchQuery = ($title: HTMLElement) => {
  if ($title && $title.textContent) return $title.textContent.split('"')[1];
};

const MovieList = ({
  title,
  type,
  isLastPage,
}: {
  title: string;
  type: string;
  isLastPage: boolean;
}) => {
  const $section = document.createElement('section');
  const $title = document.createElement('h2');
  const $ul = document.createElement('ul');

  const render = () => {
    $section.classList.add('item-view');

    $title.textContent = title;

    $ul.classList.add('item-list');
    movieStore.movies.forEach((movie) => {
      const $movieItem = MovieItem(movie).render();
      $ul.appendChild($movieItem);
    });

    $section.appendChild($title);
    $section.appendChild($ul);

    return $section;
  };

  function loadMore() {
    $ul.dispatchEvent(
      new CustomEvent(type, {
        bubbles: true,
        detail: {
          curType: type,
          query: getSearchQuery($title),
        },
      }),
    );
  }

  function handleScroll() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !isLastPage) {
      throttle().throttling(loadMore, 1000);
    }
  }

  window.addEventListener('scroll', handleScroll);

  return {
    render,
  };
};
export default MovieList;
