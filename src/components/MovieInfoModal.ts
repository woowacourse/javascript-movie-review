import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { makePosterImagePath } from '../utils/makePosterImagePath';
import { MovieInterface, ScoreType } from '../utils/type';
import { Event } from '../utils/index';

export function MovieInfoModal() {
  //   { poster_path, title, vote_average }: MovieInterface,
  //   userScore: ScoreType
  return `
  <dialog>
    <div class="modal-movie-name">
        <button class="modal-close">X</button>
    </div>
    <div class="modal-movie-detail">
        <img src="" class="modal-movie-poster" alt="">
        <div class="modal-movie-detail-text">
            <div class="modal-movie-category">장르/ 
                <img src="${star_empty}" alt="별점" /></p>
            </div>
            <P class="modal-movie-story">줄거리</p>
            <div class="modal-movie-category-star">사용자 별점</div>
        </div>
    </div>
  </dialog>
     `;
}

// <dialog>
// <div class="modal-movie-name">${title}
//     <button class="modal-close">X</button>
// </div>
// <div class="modal-movie-detail">
//     <img src=${makePosterImagePath(poster_path)} class="modal-movie-poster" alt="${title}">
//     <div class="modal-movie-detail-text">
//         <div class="modal-movie-category">장르/
//             <img src="${
//               vote_average === 0 ? star_empty : star_filled
//             }" alt="별점" />${vote_average}</p>
//         </div>
//         <P class="modal-movie-story">줄거리</p>
//         <div class="modal-movie-category-star">사용자 별점</div>
//     </div>
// </div>
// </dialog>
