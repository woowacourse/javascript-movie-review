import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { ScoreType } from '../utils/type';
import { Event } from '../utils/index';

export function UserScoreStar(score: ScoreType) {
  // Event.addEvent("click")

  if (!score) return starTemplate('empty').repeat(5);
  return starTemplate('filled').repeat(score / 2) + starTemplate('empty').repeat(5 - score / 2);
}

function starTemplate(state: 'filled' | 'empty') {
  return `<img src="${state === 'empty' ? star_empty : star_filled}" alt="${
    state === 'empty' ? '빈 별' : '채워진 별'
  }" />`;
}
