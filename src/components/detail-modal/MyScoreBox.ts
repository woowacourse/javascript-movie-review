import MY_SCORE_TEXT from '../../constants/constants';
import DetailModalController from '../../controllers/DetailModalController';
import { appendChildren } from '../../utils/domUtils';
import Button from '../common/Button';
import Form from '../common/Form';
import TextBox from '../common/TextBox';
import Wrapper from '../common/Wrapper';

function handleStarClink(event: Event) {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  DetailModalController.updateScoreBox(button.value);
}

function makeStarScoreButton() {
  const $wrapper = Form({ form: { class: 'detail-modal-stars' } });
  const $stars = Array.from(['2', '4', '6', '8', '10'], (x: string) =>
    Button({ button: { value: `${x}`, class: 'detail-modal-star-button', click: handleStarClink } })
  );

  $wrapper.append(...$stars);

  return $wrapper;
}

export default function MyScoreBox() {
  const $wrapper = Wrapper({ type: 'div', attrs: { class: 'detail-modal-score-box' } });
  const $title = TextBox({ type: 'p', attrs: { text: '내 별점', class: 'detail-modal-score-title' } });
  const $starScoreButton = makeStarScoreButton();
  const $scoreNumber = TextBox({ type: 'p', attrs: { text: '0', class: 'detail-modal-score-number' } });
  const $scoreText = TextBox({ type: 'p', attrs: { text: `${MY_SCORE_TEXT[0]}`, class: 'detail-modal-score-text' } });

  appendChildren($wrapper, [$title, $starScoreButton, $scoreNumber, $scoreText]);

  return $wrapper;
}
