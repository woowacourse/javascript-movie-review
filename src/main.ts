import getPopularMovies from './api/getPopularMovies';
import Button from './component/Button';
import Footer from './component/Footer';
import Header from './component/Header';
import MovieList from './component/MovieList';
import { $ } from './util/selector';

addEventListener('load', async () => {
  renderHeader();
  renderMovieList();
  renderFooter();
});

// ✅ 헤더 렌더링 (createDOMElement 사용)
const renderHeader = async () => {
  const { results: movies } = await getPopularMovies({ page: 1 });

  const wrap = $('#wrap');

  const header = Header({ movie: movies[1] });
  wrap?.prepend(header);
};

// ✅ 영화 목록 렌더링 (appendChild 사용)
const renderMovieList = async () => {
  const { results: movies } = await getPopularMovies({ page: 1 });

  const container = $('.container');
  if (!container) return;

  const movieList = MovieList({ movies });
  const moreButton = Button({
    text: '더보기'
    // onClick: handleMoreButtonClick
  });

  container.appendChild(movieList);
  container.appendChild(moreButton);
};

// // ✅ "더보기" 버튼 클릭 시 추가 영화 로드
// const handleMoreButtonClick = async () => {
//   const container = $('.thumbnail-list');
//   if (!container) return;

//   const currentPage = Number(container.dataset.page || 1) + 1;
//   container.dataset.page = String(currentPage);

//   const { results: newMovies } = await getPopularMovies({ page: currentPage });
//   const newMovieList = MovieList({ movies: newMovies });

//   container.appendChild(newMovieList);
// };

// ✅ 푸터 렌더링 (createDOMElement 사용)
const renderFooter = () => {
  const wrap = $('#wrap');
  if (!wrap) return;

  const footer = Footer();
  wrap.appendChild(footer);
};
