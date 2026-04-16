import { Star } from './Star';

export const Rate = (vote_average: string, filled?: boolean) => {
  const $p = document.createElement('p');
  $p.className = 'rate';

  const $span = document.createElement('span');

  const roundVote = Math.round(Number(vote_average) * 10) / 10;
  $span.textContent = roundVote.toFixed(1);

  $p.append(Star(filled), $span);
  return $p;
};
