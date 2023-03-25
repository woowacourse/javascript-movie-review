import { IMAGES } from '../../assets/images';
import { MovieDetail } from '../../types/movie';

export const movieModalContainerTemplate = ({ title, src, genre, score, overview }: MovieDetail) => {
  /* html */
  return `
		<div class="modal-header">
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
						<p class="item-genre">${genre.join(' ')}</p>
						<p class="item-score"><img src="${IMAGES.STAR_FILLED}" alt="별점" />${score}</p>
					</div>
					<p class="item-plot">${overview}</p>
				</div>
				<div class="self-grade">
					<p class="score-title">내 별점</p>
					<img class="score-image" id="1" src="${IMAGES.STAR_EMPTY}" aria-label="score"/>
					<img class="score-image" id="2" src="${IMAGES.STAR_EMPTY}" aria-label="score"/>
					<img class="score-image" id="3" src="${IMAGES.STAR_EMPTY}" aria-label="score"/>
					<img class="score-image" id="4" src="${IMAGES.STAR_EMPTY}" aria-label="score"/>
					<img class="score-image" id="5" src="${IMAGES.STAR_EMPTY}" aria-label="score"/>
					<p>별을 클릭해 영화를 평가해 주세요<p>
				</div>
			</div>
		</div>
	`;
};
