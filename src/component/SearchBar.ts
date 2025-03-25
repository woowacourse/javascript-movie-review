import getSearchMovies from '../api/getSearchMovies';
import createDOMElement from '../util/createDomElement';
import MovieList from './MovieList';
import SkeletonList from './SkeletonList';
import { $ } from '../util/selector';
import { removeBanner } from './Banner';
import MoreButton from './MoreButton';

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

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const searchKeyword = String(data.get('keyword'));

  const container = $('.container');

  const skeletonList = SkeletonList({ height: 300 });
  container?.replaceChildren(skeletonList);

  // 화면 업데이트
  const response = await getSearchMovies({ page: 1, query: searchKeyword });
  if (!response) return;
  const { results: movies, total_pages, page } = response;

  const searchedMovieList = MovieList({ movies, title: `"${searchKeyword}" 검색 결과` });

  container?.replaceChildren(searchedMovieList);

  // 더보기 버튼 추가
  if (total_pages !== page) {
    const moreButton = MoreButton({
      totalPages: total_pages,
      fetchMovies: getSearchMovies,
      fetchArgs: { query: searchKeyword }
    });

    container?.appendChild(moreButton);
  }
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
