import { $ } from '../../util/selector';
import MovieDetailContentSection from './subcomponent/MovieDetailContentSection';
import MovieDetailTitleSection from './subcomponent/MovieDetailTitleSection';
import UserScoreContainer from './subcomponent/UserScoreContainer';
import { MovieDetailContainerParams } from '../../interface/ModalInterface';
import './MovieDetailContainer.css';

class MovieDetailContainer {
  private movie;
  private onClose;
  private container;
  private userScoreContainer;

  constructor({ movie, onClose, onUpdateUserScore }: MovieDetailContainerParams) {
    this.movie = movie;
    this.onClose = onClose;

    this.container = document.createElement('div');
    this.container.id = 'modal__movie-detail';
    this.userScoreContainer = new UserScoreContainer({
      movieId: movie.id,
      userScore: movie.userScore,
      updateUserScore: onUpdateUserScore,
    });
  }

  render() {
    const titleSection = MovieDetailTitleSection({ title: this.movie.title, onClose: this.onClose });
    const contentSection = MovieDetailContentSection(this.movie);

    this.container.append(titleSection, contentSection);
    $('.movie-info-container', this.container).appendChild(this.userScoreContainer.render());

    return this.container;
  }
}

export default MovieDetailContainer;
