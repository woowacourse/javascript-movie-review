import { MovieDetailResponse } from '../../api/type';
import { IMAGE_BASE_URL } from '../../constant';
import createDOMElement from '../../util/createDomElement';

function DetailModal(movie: MovieDetailResponse): HTMLElement {
  const { title, vote_average, overview, poster_path, release_date, genres } = movie;

  const posterUrl = poster_path
    ? `${IMAGE_BASE_URL}/w440_and_h660_face/${poster_path}`
    : 'https://placehold.co/300x440?text=No+Image';

  const genrePlaceholder = genres.map((genre) => genre.name).join(',');

  const rating = vote_average.toFixed(1);

  const modal = createDOMElement({
    tag: 'div',
    className: 'detail-modal',
    children: [
      createDOMElement({
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
      }),
      createDOMElement({
        tag: 'div',
        className: 'modal-description',
        children: [
          createDOMElement({ tag: 'h2', textContent: title }),
          createDOMElement({
            tag: 'p',
            className: 'category',
            textContent: `${release_date.slice(0, 4)} · ${genrePlaceholder}`
          }),
          createDOMElement({
            tag: 'p',
            className: 'average-rate',
            children: [
              createDOMElement({
                tag: 'span',
                textContent: '평균',
                className: 'average'
              }),
              createDOMElement({
                tag: 'p',
                className: 'rate',

                children: [
                  createDOMElement({
                    tag: 'img',
                    className: 'star',
                    attributes: { src: './images/star_filled.png' }
                  }),
                  createDOMElement({
                    tag: 'span',
                    textContent: rating
                  })
                ]
              })
            ]
          }),
          createDOMElement({ tag: 'hr' }),
          createDOMElement({
            tag: 'p',
            className: 'detail',
            textContent: overview || '줄거리 정보가 없습니다.'
          })
        ]
      })
    ]
  });

  return modal;
}

export default DetailModal;
