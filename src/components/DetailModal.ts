import { Movie } from '../movies.type';
import store from '../store';

class DetailModal {
  private template = ({ id, title, poster_path, overview, vote_average, genre_ids }: Movie) => `
        <div class="modal-backdrop"></div>
            <div class="modal-container">
                <div class="modal-open" id="${id}">
                    <p class="modal-title">${title}</p>
                    <div class="modal-card">
                        <img
                            class="modal-thumbnail"
                            src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}"
                            loading="lazy"
                            alt="${title}"
                        />
                        <div class="modal-info">
                            <p class="modal-genres">${genre_ids.map((id) =>
                              store.getGenres(id),
                            )}</p>
                            <p class="modal-score"><img src="assets/star_filled.png" alt="별점" /> ${vote_average}</p>
                            <p class="modal-overview">${overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  render(movie: Movie) {
    document.querySelector('.modal')?.insertAdjacentHTML('beforeend', this.template(movie));
  }
}

export default DetailModal;
