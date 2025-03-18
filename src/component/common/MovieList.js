import { createElement } from '../../util/utils.js'
import MovieItem from './MovieItem.js'
import roundRating from '../../util/roundRating.js';

function MovieList(dataList) {
  function createList() {
    const docfrag = document.createDocumentFragment();
    dataList.forEach((data) => {
      const li = createElement('li');
      li.innerHTML = MovieItem({ img: data.poster_path, rating: roundRating(data.vote_average), title: data.title });
      docfrag.appendChild(li);
    })
    document.getElementById("thumbnailList").appendChild(docfrag);
  }
  return {createList};
}



export default MovieList;
