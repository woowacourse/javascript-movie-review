import { MovieDetailResponse } from '../../api/type';
import { IMAGE_BASE_URL } from '../../constant';
import createDOMElement from '../../util/createDomElement';
import StarRating from './StarRating';

function DetailModal(movie: MovieDetailResponse): HTMLElement {
  const { id, title, vote_average, overview, poster_path, release_date, genres } = movie;

  const posterUrl = poster_path
    ? `${IMAGE_BASE_URL}/w440_and_h660_face/${poster_path}`
    : 'https://placehold.co/300x440?text=No+Image';

  const genreText = genres.map((g) => g.name).join(', ');
  const rating = vote_average.toFixed(1);
  const year = release_date.slice(0, 4);

  const modalImage = createDOMElement({
    tag: 'div',
    className: 'modal-image',
    children: [
      createDOMElement({
        tag: 'img',
        attributes: {
          src: posterUrl,
          alt: title
        }
      })
    ]
  });

  const averageRate = createDOMElement({
    tag: 'div',
    className: 'average-rate',
    children: [
      createDOMElement({ tag: 'span', textContent: '평균', className: 'average' }),
      createDOMElement({
        tag: 'p',
        className: 'rate',
        children: [
          createDOMElement({ tag: 'img', className: 'star', attributes: { src: './images/star_filled.png' } }),
          createDOMElement({ tag: 'span', textContent: rating })
        ]
      })
    ]
  });

  const myRatingSection = createDOMElement({
    tag: 'div',
    className: 'my-rating',
    children: [
      createDOMElement({ tag: 'span', className: 'my-rating-title', textContent: '내 별점' }),
      StarRating({ movieId: id })
    ]
  });

  const description = createDOMElement({
    tag: 'div',
    className: 'modal-description',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'title-category',
        children: [
          createDOMElement({ tag: 'h2', textContent: title }),
          createDOMElement({ tag: 'p', className: 'category', textContent: `${year} · ${genreText}` }),
          averageRate
        ]
      }),

      createDOMElement({ tag: 'hr' }),
      myRatingSection,
      createDOMElement({ tag: 'hr' }),
      createDOMElement({
        tag: 'div',
        className: 'overview-wrapper',
        children: [
          createDOMElement({
            tag: 'h3',
            textContent: '줄거리'
          }),
          createDOMElement({
            tag: 'p',
            className: 'overview',
            textContent: overview || '줄거리 정보가 없습니다.'
          })
        ]
      })
    ]
  });

  return createDOMElement({
    tag: 'div',
    className: 'detail-modal',
    children: [modalImage, description]
  });
}

export default DetailModal;
