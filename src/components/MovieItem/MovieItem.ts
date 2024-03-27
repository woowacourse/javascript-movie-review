import Star from '../../assets/star_filled.png';
import NoImage from '../../assets/no_image.png';
import { Movie } from './../../types/movie';
import '../MovieItem/MovieItem.css';
import { POSTER_BASE_URL } from '../../consts/URL';
import { setUrlParams } from '../../utils/queryString';
import movieAPI from '../../api/movie';

class MovieItem {
  movie;
  itemBox;
  itemCard;

  constructor(movie: Movie) {
    this.movie = movie;
    this.itemBox = document.createElement('li');
    this.itemBox.setAttribute('data-movie-id', String(movie.id));

    this.itemCard = document.createElement('a');
    this.itemCard.classList.add('item-card');
    this.setEvent();
  }

  setEvent() {
    this.itemCard.addEventListener('click', async () => {
      setUrlParams('movie_id', String(this.movie.id));
      const result = await movieAPI.fetchDetailOfMovie({ movieId: this.movie.id });
      console.log(result);
    });
  }

  // skeletonTemplate() {
  //   const skeletonItemBox = document.createElement('li');
  //   skeletonItemBox.innerHTML = /* html */ `
  //     <a href="#">
  //       <div class="item-card">
  //         <div class="item-thumbnail skeleton"></div>
  //         <div class="item-title skeleton"></div>
  //         <div class="item-score skeleton"></div>
  //       </div>
  //     </a>`;
  //   return skeletonItemBox;
  // }

  template() {
    const { id, title, posterPath, voteAverage } = this.movie;
    // const itemBox = document.createElement('li');
    // this.itemBox.setAttribute('data-movie-id', String(id));

    // const itemCard = document.createElement('a');
    this.itemCard.classList.add('item-card');

    const titleBox = this.makeTitle(title);
    const voteAverageBox = this.makeVote(voteAverage);

    if (posterPath) {
      const posterImage = this.makePosterImage(title, posterPath);
      this.itemCard.append(posterImage);
    } else {
      const noImage = this.makeNoImage();
      this.itemCard.append(noImage);
    }

    this.itemCard.append(titleBox);
    this.itemCard.append(voteAverageBox);
    this.itemBox.append(this.itemCard);

    return this.itemBox;
  }

  makePosterImage(title: string, posterPath: string) {
    const posterImage = document.createElement('img');
    posterImage.setAttribute('loading', 'lazy');
    posterImage.classList.add('item-thumbnail');

    if (posterPath) {
      posterImage.setAttribute('src', POSTER_BASE_URL + posterPath);
    }
    posterImage.setAttribute('alt', title);

    return posterImage;
  }

  makeNoImage() {
    const noImage = document.createElement('div');
    noImage.classList.add('no-image');
    const noImageIcon = document.createElement('img');
    noImageIcon.classList.add('no-image-icon');
    noImageIcon.setAttribute('src', NoImage);
    noImage.append(noImageIcon);
    return noImage;
  }

  makeTitle(title: string) {
    const titleBox = document.createElement('p');
    titleBox.classList.add('item-title');
    titleBox.textContent = title;
    return titleBox;
  }

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
  }
}

export default MovieItem;
