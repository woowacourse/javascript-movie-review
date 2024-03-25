import Component from '../../common/Component/Component';
import type { MovieDetail } from '../../../domain/Movie/Movie.type';
import { createElement } from '../../../utils/dom/createElement/createElement';
import { MOVIE_ITEM } from '../../../constants/Condition';
import { FilledStar } from '../../../assets';
import { querySelector } from '../../../utils/dom/selector';

interface MovieListCardProps {
  movieItem: MovieDetail;
  createMovieDetailModal: (key: number) => void;
}

class MovieListCard extends Component<MovieListCardProps> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $movieItem = createElement({ tagName: 'div', attributeOptions: { id: 'movie-item', class: 'item-card' } });

    $movieItem.innerHTML = /* html */ `
        <img
          class="item-thumbnail"
          src=${`${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.movieItem.poster_path}`}
          loading="lazy",
          alt=${`${this.props?.movieItem.title}`}
        />
        <p class="item-title">${this.props?.movieItem.title}</p>
        <p class="item-score">
          ${this.props?.movieItem.vote_average.toFixed(MOVIE_ITEM.SCORE_DIGIT)} 
          <img src=${`${FilledStar}`} alt="별점" />
        </p>
    `;

    return $movieItem;
  }

  protected setEvent(): void {
    const $movieItem = querySelector('#movie-item', this.$element);
    $movieItem.addEventListener('click', () => this.props?.createMovieDetailModal(this.props.movieItem.id));
  }
}

export default MovieListCard;
