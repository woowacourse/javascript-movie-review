import IMG_SRC from '../../constants/imgSrc';
import { appendChildren } from '../../utils/domUtils';
import Dialog from '../common/Dialog';
import Img from '../common/Img';
import TextBox from '../common/TextBox';
import Wrapper from '../common/Wrapper';
import CloseButton from './CloseButton';
import MyScoreBox from './MyScoreBox';

function makePosterElement() {
  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'detail-modal-poster-wrapper' } });
  const $img = Img({ img: { class: 'detail-modal-poster-image' } });

  $wrapper.appendChild($img);

  return $wrapper;
}

function makeGenresAndScoreElement() {
  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'genres-and-score-wrapper' } });
  const $genres = TextBox({ type: 'p', attrs: { class: 'detail-modal-genres' } });
  const $starImg = Img({ img: { src: IMG_SRC.start_filled, class: 'detail-modal-star' } });
  const $score = TextBox({ type: 'p', attrs: { class: 'detail-modal-score' } });

  $wrapper.append($genres, $starImg, $score);

  return $wrapper;
}

function makeDescription() {
  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'detail-modal-desc-wrapper' } });
  const $genresAndScore = makeGenresAndScoreElement();
  const $overview = TextBox({ type: 'p', attrs: { class: 'detail-modal-overview' } });
  const $myScoreBox = MyScoreBox();

  $wrapper.append($genresAndScore, $overview, $myScoreBox);

  return $wrapper;
}

export default function DetailModal() {
  const $modal = Dialog({ dialog: { class: 'detail-modal' } });

  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'detail-modal-wrapper' } });

  const $headWrapper = Wrapper({ type: 'div', attrs: { class: 'detail-modal-head' } });
  const $title = TextBox({ type: 'h2', attrs: { class: 'detail-modal-title' } });
  const $closeButton = CloseButton();

  const $bodyWrapper = Wrapper({ type: 'div', attrs: { class: 'detail-modal-body' } });
  const $poster = makePosterElement();
  const $description = makeDescription();

  appendChildren([$modal, $wrapper], [$headWrapper, $bodyWrapper]);
  $headWrapper.append($title, $closeButton);
  $bodyWrapper.append($poster, $description);

  return $modal;
}
