import fetchSearchMovies from "../fetch/fetchSearchMovies";
import MovieContainer from "./MovieContainer";
import Main from "./Main";
import createElement from "./utils/createElement";

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
        const searchedMovies = await fetchSearchMovies(query);

        document.querySelector('header').remove();
        document.querySelector('.container').remove();
        document.querySelector('footer').remove();
 
        Main({
            popularMovies: searchedMovies,
            isReRender: true
        });
        
    });
    

    return $form;
}

export default SearchBar;