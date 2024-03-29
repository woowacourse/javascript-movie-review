import Component from '../../common/Component/Component';
import { IMovie } from '../../../domain/Movie/Movie.type';
import { querySelector } from '../../../utils/dom/selector';
import { MOVIE_ITEM } from '../../../constants/Condition';
import { FilledStar } from '../../../assets';

interface MovieListCardProps {
  movieItem: IMovie;
  openMovieDetailModal: (key: number) => void;
}

class MovieListCard extends Component<MovieListCardProps> {
  protected render() {
    this.$element.innerHTML = this.createComponent();
  }

  protected createComponent() {
    return /* html */ `
        <div id="movie-item-card" class="item-card">
          <img
            id="movie-item-thumbnail"
            class="item-thumbnail skeleton"
            src=${`${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.movieItem.poster_path}`}
            loading="lazy",
            alt=${`${this.props?.movieItem.title}`}
          />
          <p class="item-title">${this.props?.movieItem.title}</p>
          <p class="item-score">
            ${this.props?.movieItem.vote_average.toFixed(MOVIE_ITEM.SCORE_DIGIT)} 
            <img src=${`${FilledStar}`} alt="별점" />
          </p>
        </div>
    `;
  }

  private removeSkeleton() {
    const $movieItemThumbnail = querySelector<HTMLImageElement>('#movie-item-thumbnail', this.$element);
    $movieItemThumbnail.classList.remove('skeleton');
  }

  protected setEvent(): void {
    const $movieItemCard = querySelector('#movie-item-card', this.$element);
    $movieItemCard.addEventListener('click', () => this.props?.openMovieDetailModal(this.props.movieItem.id));

    const $movieItemThumbnail = querySelector<HTMLImageElement>('#movie-item-thumbnail', this.$element);
    $movieItemThumbnail.addEventListener('load', this.removeSkeleton.bind(this));
  }
}

export default MovieListCard;
