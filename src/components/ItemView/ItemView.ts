import { BUTTON } from '../../constants/INFORMATION';
import Button from '../Button/Button';
import MovieItems from '../MovieItems/MovieItems';

const ItemView = {
  create(containerTitle: string, fetchData: object) {
    const itemView = document.createElement('section');

    itemView.classList.add('item-view');

    itemView.appendChild(this.createTitle(containerTitle));
    itemView.appendChild(MovieItems.create(fetchData));
    itemView.appendChild(Button.create(BUTTON.showMore));
    return itemView;
  },

  createTitle(containerTitle: string) {
    const title = document.createElement('h2');

    title.textContent = `${containerTitle}`;

    return title;
  },
};

export default ItemView;
