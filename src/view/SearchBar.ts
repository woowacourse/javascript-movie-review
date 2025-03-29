import getSearchMovies from '../api/getSearchMovies';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';
import { removeBanner } from './render/renderBanner';
import { renderMovieList } from './render/renderMovieList';
import { hideSkeletons, renderSkeletons } from './render/renderSkeletons';

function SearchBar() {
  return createDOMElement({
    tag: 'form',
    id: 'searchForm',
    className: 'search-form',
    children: [
      createDOMElement({
        tag: 'input',
        attributes: { placeholder: '검색어를 입력하세요', type: 'text', name: 'keyword' }
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

  $('.container')?.appendChild(renderSkeletons());

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const params = {
    page: '1',
    language: 'ko-KR',
    include_adult: 'false',
    query: String(data.get('keyword'))
  };

  const response = await getSearchMovies(params);
  renderMovieList(response, String(data.get('keyword')));

  hideSkeletons();
};

export default SearchBar;
