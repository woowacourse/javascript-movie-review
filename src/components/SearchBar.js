import MovieList from "./MovieList";
import fetchSearchMovies from "../fetch/fetchSearchMovies";
import createElement from "./utils/createElement";
import movies from "../store/Movies";
import page from "../store/page";
import SearchButtonImage from '../../images/searchButtonIcon.png';

const PAGE = 1;
const SEARCH_BAR_PLACEHOLDER = "검색어를 입력하세요";

function createSearchBarUI(onSubmit) {
    const $form = createElement({
        tag: 'form',
        classNames: ['search-bar-container']
    });

    const $input = createElement({
        tag: 'input',
        classNames: ['search-bar'],
        placeholder: SEARCH_BAR_PLACEHOLDER,
    });

    const $button = createElement({
        tag: 'button',
        classNames: ['search-bar-button'],
    });

    const $img = createElement({
        tag: 'img',
        src: SearchButtonImage,
    });

    $button.appendChild($img);
    $form.append($input, $button);

    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        onSubmit($input.value.trim());
    });

    return $form;
}

function updateURLQueryParam(query) {
    const params = new URLSearchParams(window.location.search);
    params.set("query", query);
    page.reset();
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}

function updateDOMForSearch(query) {
    document.querySelector('.background-container').classList.add('disappear');
    document.querySelector('.list-title').textContent = `"${query}" 검색 결과`;

    const $thumbnailList = document.querySelector('.thumbnail-list');
    if ($thumbnailList) $thumbnailList.remove();
}

async function performSearch(query) {
    if (!query) return;

    updateURLQueryParam(query);
    updateDOMForSearch(query);

    const searchMovieData = await fetchSearchMovies(query, PAGE);
    movies.updateMovies(searchMovieData.results);

    const $movieList = MovieList({ movies: movies.movieList, status: "fetched"});
    document.querySelector('section').appendChild($movieList);
}

const SearchBar = () => {
    return createSearchBarUI(performSearch);
};

export default SearchBar;
