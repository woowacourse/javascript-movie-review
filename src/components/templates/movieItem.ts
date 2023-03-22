import { IMAGES } from '../../assets/images';
import { MovieItem } from '../../types/movieItem';

export const showMovieItemTemplate = ({ src, title, score }: MovieItem): string =>
  /* html */
  `
		<li>
		<a href="#">
		  <div class="item-card">
		    <img
		      class="item-thumbnail"
		      src="${'https://image.tmdb.org/t/p/w500/' + src}"
		      loading="lazy"
		      alt="${title}"
		    />
		    <p class="item-title">${title}</p>
		    <p class="item-score"><img src="${IMAGES.STAR_FILLED}" alt="별점" /> ${score}</p>
		  </div>
		</a>
		</li>
	`;
