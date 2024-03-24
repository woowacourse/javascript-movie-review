import { appendChildren } from '../../utils/domUtils';
import Img from '../common/Img';
import ListItem from '../common/ListItem';
import TextBox from '../common/TextBox';
import Wrapper from '../common/Wrapper';

interface Props {
  posterPath: string;
  title: string;
  voteAverage: number;
}

export default function MovieItem({ posterPath, title, voteAverage }: Props) {
  const $listItem = ListItem();
  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'item-card' } });
  const $poster = Img({ img: { src: posterPath, alt: title } });
  const $title = TextBox({ type: 'p', attrs: { text: title, class: 'item-title' } });
  const $score = TextBox({ type: 'p', attrs: { text: voteAverage.toFixed(1), class: 'item-score' } });

  appendChildren($wrapper, [$poster, $title, $score]);
  appendChildren($listItem, [$wrapper]);

  return $listItem;
}
