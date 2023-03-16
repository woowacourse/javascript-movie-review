import MovieList from '../domain/MovieList';
import MovieItem from './MovieItem';
import { Movie } from '../types/movie';
import { $ } from '../utils/domSelector';
import MovieListContent from './MovieListContent';

const MovieListContainer = {
  template() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
        <div class="error-message hide"></div>
      </section>
    `;
  },

  onClick: () => {
    $<HTMLButtonElement>('#more-button').addEventListener('click', async () => {
      MovieListContent.loadMoreMovies();
    });
  },
};

export default MovieListContainer;

// import MovieList from '../domain/MovieList';
// import MovieItem from './MovieItem';
// import { $ } from '../utils/domSelector';
// import MovieListContent from './MovieListContent';

// const MovieListContainer = {
//   template() {
//     return `
//       <section class="item-view">
//         <h2 id="movie-list-title">지금 인기 있는 영화</h2>
//         <ul class="item-list"></ul>
//         <button id="more-button" class="btn primary full-width">더 보기</button>
//         <div class="error-message hide"></div>
//       </section>
//     `;
//   },

//   onClick: () => {
//     $<HTMLButtonElement>('#more-button').addEventListener('click', async () => {
//       MovieListContent.loadMoreMovies();
//     });
//   },

//   show: () => {
//     $<HTMLHeadingElement>('#movie-list-title').style.display = 'block';
//     $<HTMLButtonElement>('#more-button').style.display = 'block';
//   },

//   hideTitle: () => {
//     $<HTMLHeadingElement>('#movie-list-title').style.display = 'none';
//   },

//   hideButton: () => {
//     $<HTMLButtonElement>('#more-button').style.display = 'none';
//   },
// };

// export default MovieListContainer;
