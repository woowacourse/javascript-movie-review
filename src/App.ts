import MovieCard from './components/MovieCard';
import mockingData from './mock/mockingData';

export default class App {
  run() {
    const ulElement = document.querySelector('ul.item-list');

    mockingData.forEach((movieData) => {
      const card = new MovieCard(movieData);

      ulElement?.appendChild(card.element);
    });
  }
}
