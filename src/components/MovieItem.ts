const MovieItem = () => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  const itemCard = document.createElement('div');
  const thumbnail = document.createElement('img');
  const title = document.createElement('p');
  const itemScore = document.createElement('p');
  const scoreImg = document.createElement('img');

  itemCard.classList.add('item-card');
  thumbnail.classList.add('item-thumbnail');
  title.classList.add('item-title');
  itemScore.classList.add('item-score');

  thumbnail.src = 'https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg';
  thumbnail.setAttribute('loading', 'lazy');
  thumbnail.setAttribute('alt', '앤트맨과 와스프: 퀀텀매니아');

  title.textContent = '앤트맨과 와스프: 퀀텀매니아';

  scoreImg.src = './star_filled.png';
  scoreImg.alt = '별점';

  itemScore.appendChild(scoreImg);
  itemScore.textContent = '6.5';

  itemCard.appendChild(thumbnail);
  itemCard.appendChild(title);
  itemCard.appendChild(itemScore);

  link.appendChild(itemCard);
  li.appendChild(link);

  return li;
};

export default MovieItem;

// <li>
//     <a href="#">
//         <div class="item-card">
//         <img
//             class="item-thumbnail"
//             src="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg"
//             loading="lazy"
//             alt="앤트맨과 와스프: 퀀텀매니아"
//         />
//         <p class="item-title">앤트맨과 와스프: 퀀텀매니아</p>
//         <p class="item-score"><img src="./star_filled.png" alt="별점" /> 6.5</p>
//         </div>
//     </a>
// </li>
