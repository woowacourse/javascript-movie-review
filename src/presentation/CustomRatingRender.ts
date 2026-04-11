const renderStars = (rate: number | null) => {
  const starsEl = document.querySelector<HTMLElement>('#rate-stars');
  if (!starsEl) return;
  starsEl.innerHTML = '';
  const filledCount = rate === null ? 0 : rate / 2;
  for (let i = 1; i <= 5; i++) {
    const img = document.createElement('img');
    if (i <= filledCount) {
      img.src = './images/star_filled.png';
    } else {
      img.src = './images/star_empty.png';
    }
    img.dataset.index = String(i);
    starsEl.appendChild(img);
  }
};

const renderEvaluate = (rate: number | null) => {
  const evaluateEl = document.querySelector('#rate-evaluate');
  if (!evaluateEl) return;
  evaluateEl.textContent = rate === null ? '아직 별점을 남기지 않으셨습니다' : ratingMap.get(rate)!;
};

const renderScore = (rate: number | null) => {
  const scoreEl = document.querySelector('#rate-score');
  if (!scoreEl) return;
  scoreEl.textContent = rate === null ? '(0/10)' : `(${rate}/10)`;
};

export const renderCustomRating = (rate: number | null) => {
  renderStars(rate);
  renderEvaluate(rate);
  renderScore(rate);
}

const ratingMap = new Map([
  [2 ,"최악이예요"],
  [4 , "별로예요"],
  [6 , "보통이에요"],
  [8 , "재미있어요"],
  [10 , "명작이에요"]
]);