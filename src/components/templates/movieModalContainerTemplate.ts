import { IMAGES } from '../../assets/images';
import { MovieDetail } from '../../types/movie';

export const movieModalContainerTemplate = ({ title, src, genre, score, overview }: MovieDetail) => {
  /* html */
  return `
		<div class="modal-header">
			<h2 class="item-title">${title}</h2>
			<button type="button" class="escape-button" aria-label="escape">X</button>
		</div>
		<div class="modal-body">
			<div class="item-poster">
				<img
					class="item-thumbnail skeleton"
					src=${src ? `https://image.tmdb.org/t/p/w500/${src}` : IMAGES.POSTER_EMPTY}
					loading="lazy"
					alt="${title}"
				/>
			</div>
			<div class="item-info">
				<div class="item-genre-score-plot">
					<div class="item-genre-score">
						<p class="item-genre">${genre.join(' ')}</p>
						<p class="item-score"><img src="${IMAGES.STAR_FILLED}" alt="별점" />${score}</p>
					</div>
					<p class="item-plot">${overview}</p>
				</div>
				<div class="self-grade">
					<p>내 별점</p>
					<p>⭐️⭐️⭐️⭐️⭐️</p>
					<p>6 보통이예요</p>
				</div>
			</div>
		</div>
	`;
};
