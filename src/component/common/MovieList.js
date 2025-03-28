import { createElement } from '../../util/utils.js'
import MovieItem from './MovieItem.js'
import roundRating from '../../util/roundRating.js';

function MovieList(dataList) {
  function template() {
    const ul = createElement('ul');
    ul.classList.add('thumbnail-list');
    ul.id = 'thumbnailList';

    dataList.forEach((data) => {
      const li = createElement('li');
      li.innerHTML = MovieItem({ img: data.poster_path, rating: roundRating(data.vote_average), title: data.title });
      li.id = data.id
      ul.appendChild(li);
    });

    return ul;
  }
  return { template };
}

export default MovieList;
