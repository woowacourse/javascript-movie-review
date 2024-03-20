import './MovieItem.css';
import StarFilled from '../../statics/images/star_filled.png';

const createTitle = (title: string) => {
  const $title = document.createElement('p');
  $title.classList.add('item-title');
  $title.textContent = title;
  return $title;
};

const createScore = (vote_average: number) => {
  const $score = document.createElement('p');
  $score.classList.add('item-score');

  const $scoreImg = document.createElement('img');
  $scoreImg.src = StarFilled;
  $scoreImg.alt = '별점';
  $score.textContent = vote_average.toString();
  $score.appendChild($scoreImg);

  return $score;
};

const createThumbnail = (title: string, poster_path: string) => {
  const $thumbnail = document.createElement('img');
  $thumbnail.classList.add('item-thumbnail');
  $thumbnail.src = `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`;
  $thumbnail.loading = 'lazy';
  $thumbnail.alt = title;

  return $thumbnail;
};

const createCard = ({
  title,
  poster_path,
  vote_average,
}: Pick<Movie, 'title' | 'poster_path' | 'vote_average'>) => {
  const $card = document.createElement('div');
  $card.classList.add('item-card');

  const $thumbnail = createThumbnail(title, poster_path);
  const $title = createTitle(title);
  const $score = createScore(vote_average);

  $card.appendChild($thumbnail);
  $card.appendChild($title);
  $card.appendChild($score);

  return $card;
};

const createMovieItem = (movie: Movie) => {
  const $li = document.createElement('li');
  const $anchor = document.createElement('a');
  // TODO: 2단계때 사용
  // $anchor.href = movie.id.toString();
  $anchor.href = '#';
  const $card = createCard(movie);

  $anchor.appendChild($card);
  $li.appendChild($anchor);

  return $li;
};

function MovieItem(movie: Movie) {
  return {
    render: () => {
      const $movieItem = createMovieItem(movie);
      return $movieItem;
    },
  };
}
export default MovieItem;
