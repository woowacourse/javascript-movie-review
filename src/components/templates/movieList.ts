import { IMAGES } from '../../assets/images';
import { MoveItem } from '../../types/movie';
import { MovieResult } from '../../types/movieApi';

const generateMovieItemTemplate = ({ src, title, score }: MoveItem): string =>
  /* html */
  `
		<li>
		  <div class="item-card">
		    <img
		      class="item-thumbnail skeleton"
		      src=${src ? `https://image.tmdb.org/t/p/w500/${src}` : IMAGES.POSTER_EMPTY}
		      loading="lazy"
		      alt="${title}"
		    />
		    <p class="item-title">${title}</p>
		    <p class="item-score"><img src="${IMAGES.STAR_FILLED}" alt="별점" /> ${score}</p>
		  </div>
		</li>
	`;

export const generateMovieListTemplate = (movieList: MovieResult[]) => {
  const movieItemTemplateList = movieList
    .map(movie => generateMovieItemTemplate({ src: movie.poster_path, title: movie.title, score: movie.vote_average }))
    .join('');

  return (
    movieItemTemplateList ||
    /* html */
    `
			<div class="empty-movie-list-container">
				<h3>찾을 수 없는 영화 이름입니다 🥲</h3>
				<p>단어의 철자가 정확한지 확인해 보세요.</p>
				<p>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</p>
				<p>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해보세요.</p>
			</div>
		`
  );
};
