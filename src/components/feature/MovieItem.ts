import { MovieItem as MovieItemType } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Img } from '../common/Img';
import { Text } from '../common/Text';

export const MovieItem = ({ ...props }: MovieItemType) => {
  const { title, vote_average, poster_path } = props;
  const liElement = <HTMLLIElement>createElement('li', {
    classList: 'flex flex-col justify-start gap-10',
  });

  // TODO : URL 분리
  const movieImg = Img({
    src: 'https://image.tmdb.org/t/p/w220_and_h330_face' + poster_path,
    classList: ['thumbnail'],
    props: {
      alt: title,
    },
  });

  const descItemDiv = <HTMLDivElement>createElement('div', {
    classList: 'flex flex-col gap-10',
  });

  const rateDiv = <HTMLDivElement>createElement('div', {
    classList: 'flex gap-8',
  });

  const rateText = Text({
    classList: ['text-lg', 'font-semibold', 'text-yellow'],
    props: {
      textContent: `${vote_average}`,
    },
  });

  const starIcon = Img({
    width: '16',
    height: '16',
    src: './images/star_empty.png',
  });

  const titleText = Text({
    classList: ['text-xl', 'font-bold'],
    props: {
      textContent: title,
    },
  });

  liElement.append(movieImg, descItemDiv);
  descItemDiv.append(rateDiv, titleText);
  rateDiv.append(starIcon, rateText);

  return liElement;
};
