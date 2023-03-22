import { IMAGES } from '../../assets/images';
import { MoveItem } from '../../types/movie';
import { MovieResult } from '../../types/movieApi';

const generateMovieItemTemplate = ({ src, title, score }: MoveItem): string =>
  /* html */
  `
		<li>
		<a href="#">
		  <div class="item-card">
		    <img
		      class="item-thumbnail"
		      src="https://image.tmdb.org/t/p/w500/${src}"
		      loading="lazy"
		      alt="${title}"
		    />
		    <p class="item-title">${title}</p>
		    <p class="item-score"><img src="${IMAGES.STAR_FILLED}" alt="별점" /> ${score}</p>
		  </div>
		</a>
		</li>
	`;

export const generateMovieListTemplate = (movieList: MovieResult[]) => {
  const movieItemTemplateList = movieList
    .map(movie => generateMovieItemTemplate({ src: movie.poster_path, title: movie.title, score: movie.vote_average }))
    .join('');

  /* html */
  return `
		<ul class="item-list">
			${movieItemTemplateList}
		</ul>
	`;
};
