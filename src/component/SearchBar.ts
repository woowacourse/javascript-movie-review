import getSearchMovies from '../api/getSearchMovies';
import createDOMElement from '../util/createDomElement';
import Button from './Button';
import MovieList, { addMoreMovieList } from './MovieList';
import SkeletonList, { addSkeletonList, removeSkeletonList } from './SkeletonList';
import { $ } from '../util/selector';

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

const removeHeader = () => {
  const banner = document.querySelector('header');
  banner?.remove();

  const main = document.querySelector('main');
  if (!main) return;
  main.style.padding = '100px 0 64px';
};

const handleSearchMovies = async (e: Event) => {
  e.preventDefault();
  removeHeader();

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const searchKeyword = String(data.get('keyword'));

  const container = $('.container');

  const skeletonList = SkeletonList({ height: 300 });
  container?.replaceChildren(skeletonList);

  // 화면 업데이트
  let currentPage = 1;
  const response = await getSearchMovies({ page: currentPage, query: searchKeyword });
  if (!response) return;
  const { results: movies, total_pages, page } = response;

  const searchedMovieList = MovieList({ movies, title: `"${searchKeyword}" 검색 결과` });

  container?.replaceChildren(searchedMovieList);

  // 더보기 버튼 추가
  if (total_pages !== page) {
    const moreButton = Button({
      text: '더보기',
      id: 'moreButton',
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

  addSkeletonList(container);

  const response = await getSearchMovies({ page, query });
  if (!response) return;
  const { results: newMovies } = response;

  removeSkeletonList();

  addMoreMovieList(newMovies);
};

export default SearchBar;

// import createDOMElement from '../util/createDomElement';

// interface SearchBarProps {
//   onSubmit: (e: Event) => void;
// }

// function SearchBar({ onSubmit }: SearchBarProps) {
//   return createDOMElement({
//     tag: 'form',
//     id: 'searchForm',
//     className: 'search-form',
//     children: [
//       createDOMElement({
//         tag: 'input',
//         attributes: {
//           placeholder: '검색어를 입력하세요',
//           type: 'text',
//           name: 'keyword'
//         }
//       }),
//       createDOMElement({
//         tag: 'button',
//         children: [
//           createDOMElement({
//             tag: 'img',
//             attributes: {
//               src: 'images/search.png',
//               alt: '검색 아이콘'
//             }
//           })
//         ]
//       })
//     ],
//     event: { submit: onSubmit }
//   });
// }

// export default SearchBar;
