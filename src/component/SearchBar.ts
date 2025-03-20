import getSearchMovies from '../api/getSearchMovies';
import createDOMElement from '../util/createDomElement';
import { $ } from '../util/selector';
import Button from './Button';
import Movie from './Movie';
import MovieList from './MovieList';

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

  // 헤더 날리기
  const banner = document.querySelector('header');
  banner?.remove();

  const main = document.querySelector('main');
  if (!main) return;
  main.style.padding = '100px 0 64px';

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const searchKeyword = String(data.get('keyword'));

  // 화면 업데이트
  let currentPage = 1;

  const { results: movies, total_pages, page } = await getSearchMovies({ page: currentPage, query: searchKeyword });

  const searchedMovieList = MovieList({ movies, title: `"${searchKeyword}" 검색 결과` });
  const container = $('.container');

  container?.replaceChildren(searchedMovieList);

  // 더보기 버튼 추가
  if (total_pages !== page) {
    const moreButton = Button({
      text: '더보기',
      onClick: () => handleMoreButtonClick(++currentPage, searchKeyword, total_pages, moreButton)
    });

    container?.appendChild(moreButton);
  }
};

const handleMoreButtonClick = async (page: number, query: string, total_pages: number, moreButton: HTMLElement) => {
  if (page >= total_pages) {
    moreButton.remove();
  }
  const container = $('.thumbnail-list') as HTMLElement;
  if (!container) return;

  const { results: newMovies } = await getSearchMovies({ page, query });

  const fragment = document.createDocumentFragment();

  newMovies.forEach((movie) => {
    const newMovie = Movie({ movie });
    fragment.appendChild(newMovie);
  });

  container.appendChild(fragment);
};

export default SearchBar;
