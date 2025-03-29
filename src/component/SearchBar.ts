import getSearchMovies from '../api/getSearchMovies';
import createDOMElement from '../util/createDomElement';
import MovieList from './MovieList';
import SkeletonList from './SkeletonList';
import { $ } from '../util/selector';
import { removeBanner } from './Banner';
import { createObserverTarget } from './MovieList';
import Movie from './Movie';

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

export default SearchBar;

const handleSearchMovies = async (e: Event) => {
  e.preventDefault();
  removeBanner();

  const searchKeyword = getSearchKeyword(e);
  if (!searchKeyword) return;

  await renderMovies(searchKeyword);
};

const getSearchKeyword = (e: Event): string | null => {
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const keyword = data.get('keyword');
  return keyword ? String(keyword) : null;
};

const renderMovies = async (searchKeyword: string) => {
  const container = $('.container');
  if (!container) return;

  const skeletonList = SkeletonList({ height: 300 });
  container.replaceChildren(skeletonList);

  const response = await getSearchMovies({ page: 1, query: searchKeyword });
  if (!response) return;

  const { results: movies, total_pages } = response;
  let currentPage = 1;

  const searchedMovieList = MovieList({
    movies,
    title: `"${searchKeyword}" 검색 결과`
  });

  container.replaceChildren(searchedMovieList);

  if (currentPage < total_pages) {
    observeNextPage(searchKeyword, total_pages, currentPage);
  }
};

const observeNextPage = (searchKeyword: string, totalPages: number, startPage: number = 1) => {
  let page = startPage;

  const container = $('.container');
  const list = $('.thumbnail-list');
  if (!container || !list) return;

  const target = createObserverTarget();
  container.appendChild(target);

  const observer = new IntersectionObserver(async ([entry], obs) => {
    if (!entry.isIntersecting) return;

    obs.unobserve(entry.target);
    page++;

    if (page > totalPages) return;

    const res = await getSearchMovies({ page, query: searchKeyword });
    if (!res) return;

    res.results.forEach((movie) => {
      list.appendChild(Movie({ movie }));
    });

    const newTarget = createObserverTarget();
    container.appendChild(newTarget);
    obs.observe(newTarget);
  });

  observer.observe(target);
};
