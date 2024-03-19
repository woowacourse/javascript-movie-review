import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard';
import mockingData from './mock/mockingData';

export default class App {
  run() {
    const ulElement = document.querySelector('ul.item-list');

    mockingData.forEach((movieData) => {
      const card = new MovieCard(movieData);

      ulElement?.appendChild(card.element);
    });

    const itemView = document.querySelector('section.item-view');

    const moreBtn = new MoreButton();

    itemView?.appendChild(moreBtn.element);
  }
}
