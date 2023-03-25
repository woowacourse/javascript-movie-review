import { IMAGES } from '../../assets/images';
import { MovieDetail } from '../../types/movie';
import { generateSelfGradeTemplate } from './selfGradeTemplate';

export const movieModalContainerTemplate = ({ id, title, src, genre, score, overview }: MovieDetail) => {
  /* html */
  return `
		<div class="modal-header" id="${id}">
			<h2 class="item-title">${title}</h2>
			<button type="button" class="escape-button" aria-label="score">X</button>
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
						<p class="item-genre">${genre && genre.join(', ')}</p>
						<img class="item-score-image" src="${IMAGES.STAR_FILLED}" alt="별점" />
						<p class="item-score">${score}</p>
					</div>
					<p class="item-overview">${overview}</p>
				</div>
				<div class="self-grade">
					${generateSelfGradeTemplate(id)}
				</div>
			</div>
		</div>
	`;
};
