import fetchSearchMovies from "../fetch/fetchSearchMovies";
import MovieContainer from "./MovieContainer";
import Main from "./Main";
import createElement from "./utils/createElement";
import movies from "../store/movies";
import MovieList from "./MovieList";

const SearchBar = () => {
    const $form = createElement({
        tag: 'form',
        classNames: ['search-bar-container']
    });

    const $input = createElement({
        tag: 'input',
        classNames: ['search-bar'],
        placeholder: "검색어를 입력하세요"
    });

    const $button = createElement({
        tag: 'button',
        classNames: ['search-bar-button'],
    });

    const $img = createElement({
        tag: 'img',
        src: './images/searchButtonIcon.png',
    });

    $form.appendChild($input);
    $form.appendChild($button);
    $button.appendChild($img);

    $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = document.querySelector('.search-bar').value;

        const params = new URLSearchParams(window.location.search);

        if (params.has("query")) {
        params.set("query", query);
        } else {
        params.append("query", query);
        }

        window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

        const searchedMovies = await fetchSearchMovies(query, 1);
        movies.updateMovies(searchedMovies);

        document.querySelector('.thumbnail-list').remove();
 
        document.querySelector('section').appendChild(
            MovieList({
                movies: movies.getMovies(),
            })
          )
      
    });
    

    return $form;
}

export default SearchBar;
