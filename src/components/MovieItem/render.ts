import createElement from '../../utils/createElement';
import starImg from '../../../templates/star_filled.png';
import formatToDecimalPlaces from '../../utils/formatToDecimalPlaces';

const createItemScore = () => {
  const itemScore = createElement('p', { className: 'item-score', textContent: formatToDecimalPlaces(6.789, 1) });
  const starIcon = createElement('img', { src: starImg, alt: '별점' });
  itemScore.appendChild(starIcon);

  return itemScore;
};

const createItemImage = () => {
  const image = createElement('img', {
    className: 'item-thumbnail',
    src: 'https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg',
    loading: 'lazy',
    alt: '앤트맨과 와스프: 퀀텀매니아',
  });

  return image;
};

const createItemCardContent = () => {
  const itemImage = createItemImage();
  const itemTitle = createElement('p', { className: 'item-title', textContent: '앤트맨' });
  const itemScore = createItemScore();

  const fragment = document.createDocumentFragment();
  fragment.appendChild(itemImage);
  fragment.appendChild(itemTitle);
  fragment.appendChild(itemScore);

  return fragment;
};

export const renderHandler = () => {
  const li = createElement('li');
  const a = createElement('a');
  const itemCard = createElement('div', { className: 'item-card' });
  const itemCardContent = createItemCardContent();

  itemCard.appendChild(itemCardContent);
  a.appendChild(itemCard);
  li.appendChild(a);

  return li;
};

// <li>
// <a href="#">
//   <div class="item-card">
//     <img
//       class="item-thumbnail"
//       src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
//       loading="lazy"
//       alt="앤트맨과 와스프: 퀀텀매니아"
//     />
//     <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
//     <p class="item-score"><img src="./star_filled.png" alt="별점" /> 6.5</p>
//   </div>
// </a>
// </li>
