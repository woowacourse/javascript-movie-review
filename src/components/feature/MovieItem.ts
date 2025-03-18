import { MovieItem as MovieItemType } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Icon } from '../common/Icon';
import { Text } from '../common/Text';

export const MovieItem = ({ ...props }: MovieItemType) => {
  const { title, vote_average, poster_path } = props;
  const liElement = <HTMLLIElement>createElement('li');

  const itemDiv = <HTMLDivElement>createElement('div');
  itemDiv.classList.add('item');

  const movieImg = <HTMLImageElement>createElement('img');
  movieImg.src = poster_path;
  movieImg.width = 200;
  movieImg.height = 300;
  movieImg.alt = title;

  const descItemDiv = <HTMLDivElement>createElement('div');
  descItemDiv.classList.add('item-desc');

  const rateText = Text({
    classList: ['rate'],
    props: {
      textContent: `${vote_average}`,
    },
  });

  const starIcon = Icon({
    width: 16,
    height: 16,
    src: './images/star_empty.png',
  });

  const titleText = Text({
    props: {
      textContent: title,
    },
  });

  liElement.append(movieImg, descItemDiv);
  descItemDiv.append(rateText, starIcon, titleText);

  return liElement;
};
