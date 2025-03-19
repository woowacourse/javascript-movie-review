import Main from './Main';
import fetchPopularMovies from '../fetch/fetchPopularMovies';
import fetchSearchMovies from '../fetch/fetchSearchMovies';
import movies from '../store/movies';
import page from '../store/page';
import createElement from './utils/createElement';
import MovieList from './MovieList';

const Button = ({ text, type }) => {
  const $button = createElement({
    tag: 'button',
    classNames: ['primary', `${type}`],
  });

  $button.textContent = text;

  $button.addEventListener("click", async () => {
    const $input = document.querySelector(".search-bar");
    
    const params = new URLSearchParams(window.location.search);
    
    let fetchedMovies;
    if(params.has("query")) {
       fetchedMovies = await fetchSearchMovies(params.get("query"), page.getPage());
    }
    else {
      fetchedMovies = await fetchPopularMovies(page.getPage());
    }

    movies.addMovies(fetchedMovies);

    if (fetchedMovies.length === 0) {
      $button.classList.add('disappear')
    }
    
    document.querySelector('.thumbnail-list').remove();

    document.querySelector('section').appendChild(
      MovieList({
          movies: movies.getMovies(),
      })
    )

    
  });

  return $button;
};

export default Button;
