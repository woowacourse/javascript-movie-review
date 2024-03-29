import MovieList from '../MovieList/MovieList';

// const clearItemViewForError = () => {
//   const $ul = document.querySelector('.item-view ul') as HTMLElement;
//   const $h2 = document.querySelector('.item-view h2') as HTMLElement;
//   const $itemView = document.querySelector('.item-view');
//   $itemView?.removeChild($ul);
//   $itemView?.removeChild($h2);
// };

// const showSearchResultsNotFound = ($skeletonMovieList: HTMLElement) => {
//   const $itemView = document.querySelector('.item-view');
//   const $skeletonUl = $skeletonMovieList.querySelector('ul') as HTMLElement;
//   $skeletonMovieList.removeChild($skeletonUl);

//   const $searchResultsNotFound = document.createElement('p');
//   $searchResultsNotFound.classList.add('search-results-not-found');
//   $searchResultsNotFound.textContent = '검색 결과가 존재하지 않습니다.';

//   $itemView?.appendChild($searchResultsNotFound);
// };

const Main = () => {
  const $main = document.createElement('main');
  const movieList = MovieList();

  return {
    render: () => {
      const $movieList = movieList.render({
        title: '지금 인기있는 영화',
        type: 'popular',
        isLastPage: false,
      });

      $main.appendChild($movieList);
      return $main;
    },
  };
};

export default Main;
