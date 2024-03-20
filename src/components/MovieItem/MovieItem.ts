import './style.css';

import StarFilled from '../../imgs/star_filled.png';
import { IMAGE_URL_PREFIX } from '../../constants/url';

interface MovieItemsProps {
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
}

const MovieItem = {
  createElements({ poster_path, title, vote_average }: MovieItemsProps) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.setAttribute('href', '#');

    const div = document.createElement('div');
    div.classList.add('item-card');

    const img = document.createElement('img');
    img.classList.add('item-thumbnail');
    img.setAttribute('src', IMAGE_URL_PREFIX + poster_path);
    img.setAttribute('alt', title);
    img.setAttribute('loading', 'lazy');

    const p1 = document.createElement('p');
    p1.classList.add('item-title');
    p1.textContent = title;

    const p2 = document.createElement('p');
    p2.classList.add('item-score');
    p2.textContent = `${vote_average}`;

    const starImg = document.createElement('img');
    starImg.setAttribute('src', StarFilled);
    starImg.setAttribute('alt', '별점');

    p2.appendChild(starImg);
    div.appendChild(img);
    div.appendChild(p1);
    div.appendChild(p2);
    a.appendChild(div);
    li.appendChild(a);

    return li;
  },
};

export default MovieItem;
