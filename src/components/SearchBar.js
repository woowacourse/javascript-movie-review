import createElement from "./utils/createElement";

const SearchBar = () => {
    const $div = createElement({
        tag: 'div',
    });

    const $input = createElement({
        tag: 'input',
        classNames: ['search-bar'],
    });

    const $button = createElement({
        tag: 'button',
        classNames: ['search-bar-button'],
    });

    const $img = createElement({
        tag: 'img',
        src: './images/searchButtonIcon.png',
    });

    $div.appendChild($input);
    $div.appendChild($button);
    $button.appendChild($img);

    return $div;
}

export default SearchBar;