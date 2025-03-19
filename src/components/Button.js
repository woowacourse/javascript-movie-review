import Main from './Main';
import fetchPopularMovies from '../fetch/fetchPopularMovies';
import fetchSearchMovies from '../fetch/fetchSearchMovies';
import movies from '../store/movies';
import page from '../store/page';
import createElement from './utils/createElement';

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
    
    document.querySelector('header').remove();
    document.querySelector('.container').remove();
    document.querySelector('footer').remove();

    Main({
        movies: movies.getMovies(),
        isReRender: true
    });
    
  });

  return $button;
};

export default Button;




