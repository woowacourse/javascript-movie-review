import './StarRating.css';

import SELECTORS from '../../../constants/selectors';
import {
  DESCRIPTIONS,
  NUM_OF_STARS,
  SCORE_GAP,
} from '../../../constants/starRating';

import emptyStar from '../../../statics/images/star_empty.png';
import filledStar from '../../../statics/images/star_filled.png';
import UserMovieStore from '../../../stores/userMovieStore';

const { container, label, board, icon, score, description } =
  SELECTORS.STAR_RATING;

const createDescription = (initialScore: number) => {
  const $description = document.createElement('p');
  $description.classList.add(description);
  $description.textContent = DESCRIPTIONS[initialScore];

  return $description;
};

const createScore = (initialScore: number) => {
  const $score = document.createElement('p');
  $score.classList.add(score);
  $score.textContent = initialScore.toString();

  return $score;
};

const createBoard = (initialScore: number) => {
  const $board = document.createElement('div');
  $board.classList.add(board);

  const fragment = document.createDocumentFragment();
  Array.from({ length: NUM_OF_STARS }).forEach((_, index) => {
    const $img = document.createElement('img');
    $img.classList.add(icon);
    $img.setAttribute('data-score', (index + 1).toString());

    $img.src = index * SCORE_GAP < initialScore ? filledStar : emptyStar;

    fragment.appendChild($img);
  });

  $board.appendChild(fragment);

  return $board;
};

const createLabel = () => {
  const $label = document.createElement('p');
  $label.classList.add(label);
  $label.textContent = '내 별점';

  return $label;
};

const createContainer = () => {
  const $container = document.createElement('div');
  $container.classList.add(container);

  return $container;
};

const StarRating = ({ id }: { id: number }) => {
  const { userRating: initialScore } = UserMovieStore.get(id);
  let curScore = initialScore;

  const $container = createContainer();
  const $label = createLabel();
  const $board = createBoard(curScore);
  const $score = createScore(curScore);
  const $description = createDescription(curScore);

  const rerenderBoard = (newScore: number) => {
    const stars = $board.querySelectorAll<HTMLImageElement>(`.${icon}`);
    if (!stars) return;

    stars.forEach(($star, index) => {
      $star.src = index * SCORE_GAP < newScore ? filledStar : emptyStar;
    });
  };

  const rerenderScore = (newScore: number) => {
    $score.textContent = newScore.toString();
  };

  const rerenderDescription = (newScore: number) => {
    $description.textContent = DESCRIPTIONS[newScore];
  };

  const rerenderStarRating = (newScore: number) => {
    rerenderBoard(newScore);
    rerenderScore(newScore);
    rerenderDescription(newScore);
  };

  $board.addEventListener('mouseover', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const newScore = target.getAttribute('data-score');
    if (!newScore) return;

    if (target.className === icon) {
      const newScoreNum = Number(newScore);
      rerenderStarRating(newScoreNum * SCORE_GAP);
    }
  });

  $board.addEventListener('mouseleave', () => {
    rerenderStarRating(curScore);
  });

  $board.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const starScore = target.getAttribute('data-score');
    if (!starScore) return;

    if (target.className === icon) {
      curScore = Number(starScore) * SCORE_GAP;
      rerenderStarRating(curScore);

      UserMovieStore.add({ id, userRating: curScore });
    }
  });

  const render = () => {
    const fragment = document.createDocumentFragment();

    fragment.appendChild($label);
    fragment.appendChild($board);
    fragment.appendChild($score);
    fragment.appendChild($description);

    $container.appendChild(fragment);

    return $container;
  };

  return {
    render,
  };
};

export default StarRating;
