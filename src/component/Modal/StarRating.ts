import createDOMElement from '../../util/createDomElement';
import { getLocalStorage, LOCAL_STORAGE_KEYS, setLocalStorage } from '../../util/localStorage';

type StarRatingProps = {
  movieId: number;
};

function StarRating({ movieId }: StarRatingProps): HTMLElement {
  const savedRating = getMovieRating(movieId);

  const descriptionText = createDOMElement({
    tag: 'span',
    className: 'rating-desc',
    textContent: savedRating ? RATING_TEXT_MAP[savedRating] + ' ' : ''
  });

  const scoreText = createDOMElement({
    tag: 'span',
    className: 'score-highlight',
    textContent: savedRating ? `(${savedRating}/10)` : ''
  });

  const ratingTextElement = createDOMElement({
    tag: 'p',
    className: 'my-rating-text',
    children: [descriptionText, scoreText]
  });

  const stars = Array.from({ length: 5 }, (_, i) => {
    const value = (i + 1) * 2;
    const isFilled = value <= savedRating;

    const star = createDOMElement({
      tag: 'img',
      className: 'star rating-star',
      attributes: {
        src: isFilled ? STAR_IMAGE_SRC.FILLED : STAR_IMAGE_SRC.EMPTY,
        'data-value': String(value)
      }
    });

    star.addEventListener('click', () => {
      setMovieRating(movieId, value);

      stars.forEach((s, idx) => {
        const starVal = (idx + 1) * 2;
        s.setAttribute('src', starVal <= value ? STAR_IMAGE_SRC.FILLED : STAR_IMAGE_SRC.EMPTY);
      });

      descriptionText.textContent = RATING_TEXT_MAP[value] + ' ';
      scoreText.textContent = `(${value}/10)`;
    });

    return star;
  });

  return createDOMElement({
    tag: 'div',
    className: 'real-rating',
    children: [createDOMElement({ tag: 'div', className: 'my-stars', children: stars }), ratingTextElement]
  });
}

export default StarRating;

const RATING_TEXT_MAP: Record<number, string> = {
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요'
};

export const getMovieRating = (movieId: number): number => {
  const ratings = getLocalStorage<Record<number, number>>(LOCAL_STORAGE_KEYS.RATING, {});
  return ratings[movieId] ?? 0;
};

export const setMovieRating = (movieId: number, value: number) => {
  const ratings = getLocalStorage<Record<number, number>>(LOCAL_STORAGE_KEYS.RATING, {});
  const updatedRatings = { ...ratings, [movieId]: value };
  setLocalStorage(LOCAL_STORAGE_KEYS.RATING, updatedRatings);
};

export const STAR_IMAGE_SRC = {
  FILLED: 'images/star_filled.png',
  EMPTY: 'images/star_empty.png'
};
