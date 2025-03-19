import createDOMElement from '../util/createDomElement';

function SearchBar() {
  //const { results: movies } = await getPopularMovies({ page });
  return createDOMElement({
    tag: 'form',
    className: 'search-form',
    children: [
      createDOMElement({
        tag: 'input',
        attributes: { placeholder: '검색어를 입력하세요', type: 'text' }
      }),
      createDOMElement({
        tag: 'button',
        children: [
          createDOMElement({
            tag: 'img',
            attributes: { src: 'images/search.png', alt: '검색 아이콘' }
          })
        ]
      })
    ],
    event: { submit: handleSearchMovies }
  });
}

function handleSearchMovies(e: Event) {
  e.preventDefault();

  const banner = document.querySelector('header');
  banner?.remove();

  const main = document.querySelector('main');
  if (!main) return;
  main.style.padding = '100px 0 64px';
}
export default SearchBar;
