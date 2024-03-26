import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no_image.png';
import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { POSTER_BASE_URL } from '../../consts/URL';

const MovieItem = {
  skeletonTemplate() {
    const skeletonItemBox = document.createElement('li');
    skeletonItemBox.innerHTML = /* html */ `
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div> 
          <div class="item-score skeleton"></div>
        </div>
      </a>`;
    return skeletonItemBox;
  },

  template(movie: Movie) {
    const { id, title, posterPath, voteAverage } = movie;
    const itemBox = document.createElement('li');
    itemBox.setAttribute('data-movie-id', String(id));

    const itemCard = document.createElement('a');
    itemCard.classList.add('item-card');

    const titleBox = this.makeTitle(title);
    const voteAverageBox = this.makeVote(voteAverage);

    if (posterPath) {
      const posterImage = this.makePosterImage(title, posterPath);
      itemCard.append(posterImage);
    } else {
      const noImage = this.makeNoImage();
      itemCard.append(noImage);
    }

    itemCard.append(titleBox);
    itemCard.append(voteAverageBox);
    itemBox.append(itemCard);

    return itemBox;
  },

  makePosterImage(title: string, posterPath: string) {
    const posterImage = document.createElement('img');
    posterImage.setAttribute('loading', 'lazy');
    posterImage.classList.add('item-thumbnail');

    if (posterPath) {
      posterImage.setAttribute('src', POSTER_BASE_URL + posterPath);
    }
    posterImage.setAttribute('alt', title);

    return posterImage;
  },

  makeNoImage() {
    const noImage = document.createElement('div');
    noImage.classList.add('no-image');
    const noImageIcon = document.createElement('img');
    noImageIcon.classList.add('no-image-icon');
    noImageIcon.setAttribute('src', NoImage);
    noImage.append(noImageIcon);
    return noImage;
  },

  makeTitle(title: string) {
    const titleBox = document.createElement('p');
    titleBox.classList.add('item-title');
    titleBox.textContent = title;
    return titleBox;
  },

  makeVote(voteAverage: number) {
    const voteAverageBox = document.createElement('p');
    voteAverageBox.classList.add('item-score');

    const starImage = document.createElement('img');
    starImage.setAttribute('src', Star);
    starImage.setAttribute('alt', '별점');

    const voteAverageText = document.createElement('span');
    voteAverageText.textContent = String(voteAverage);

    voteAverageBox.append(starImage);
    voteAverageBox.append(voteAverageText);

    return voteAverageBox;
  },
};

export default MovieItem;
