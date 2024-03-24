/* 이 이상 분리가 어려우므로, 다음 규칙 비활성화 */
/* eslint-disable max-lines-per-function */

import IMG_SRC from '../../constants/imgSrc';
import TmdbAPI from '../../services/TmdbAPI';
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
  const $poster = Img({ img: { src: `${TmdbAPI.imgUrl}${posterPath}`, alt: title } });
  const $title = TextBox({ type: 'p', attrs: { text: title, class: 'item-title' } });
  const $score = TextBox({ type: 'p', attrs: { text: voteAverage.toFixed(1), class: 'item-score' } });
  const $starImg = Img({ img: { src: IMG_SRC.start_filled, alt: '별점' } });

  appendChildren($score, [$starImg]);
  appendChildren([$listItem, $wrapper], [$poster, $title, $score]);

  return $listItem;
}
