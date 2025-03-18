import { createElement } from '../../util/utils'
import MovieItem from './MovieItem'

function MovieList(dataList) {

  function createList() {
    const docfrag = document.createDocumentFragment();
    dataList.forEach((data) => {
      const li = createElement('li');
      li.innerHTML = MovieItem({ img: data.img, rating: data.rating, title: data.title });
      docfrag.appendChild(li);
    })
    document.getElementById("thumbnailList").appendChild(docfrag);
  }

  return {createList};
}



export default MovieList;
