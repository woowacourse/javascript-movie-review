import getSearchMovies from '../api/getSearchMovies';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';
import { removeBanner } from './render/renderBanner';
import { renderMovieList } from './render/renderMovieList';
import { hideSkeletons, movieListSkeletons } from './render/skeleton/movieListSkeletons';

function SearchBar() {
  return createDOMElement({
    tag: 'form',
    id: 'searchForm',
    className: 'search-form',
    children: [
      createDOMElement({
        tag: 'input',
        attributes: { placeholder: '검색어를 입력하세요', type: 'text', name: 'keyword', required: 'true' }
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

const handleSearchMovies = async (e: Event) => {
  e.preventDefault();
  removeBanner();
  const movieList = $('.thumbnail-list');
  movieList?.replaceChildren();

  movieListSkeletons();

  const form = $('#searchForm') as HTMLFormElement;
  if (form) {
    const keyword = form.keyword.value;
    const params = {
      page: '1',
      language: 'ko-KR',
      include_adult: 'false',
      query: keyword
    };

    const response = await getSearchMovies(params);
    renderMovieList(response, keyword);
  }

  hideSkeletons();
};

export default SearchBar;
