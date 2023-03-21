import { EmptyStar, FilledStar } from '../assets';
import { USER_VOTE_MESSAGE } from '../constants/movieInformation';
import { $ } from '../utils/domSelector';

function getUserVoteMessage(userVote: number) {
  return USER_VOTE_MESSAGE[userVote];
}

function renderVoteAverage(voteAverage: number) {
  const template = `
    평균 
    <img class="vote-average-star" src="${voteAverage ? FilledStar : EmptyStar}" alt="별점" />
    <span class="vote-average">${voteAverage}</span>
  `;

  const voteAverageContainer = $<HTMLParagraphElement>('.information-vote-average-rate');
  voteAverageContainer.replaceChildren();
  voteAverageContainer.insertAdjacentHTML('beforeend', template);
}

function userVoteStarsTemplate(userVoteCount: number) {
  const userStars: string[] = [];

  Array.from({ length: userVoteCount }, () => {
    userStars.push(`<img src="${FilledStar}" alt="별점" />`);
  });

  Array.from({ length: 5 - userVoteCount }, () => {
    userStars.push(`<img src="${EmptyStar}" alt="별점" />`);
  });

  return userStars;
}

function renderUserVote(userVote: number) {
  const userVoteCount = userVote / 2;

  const voteStarsContainer = $<HTMLDivElement>('.vote-stars');
  voteStarsContainer.replaceChildren();
  voteStarsContainer.insertAdjacentHTML('beforeend', userVoteStarsTemplate(userVoteCount).join(''));

  const voteComment = $<HTMLParagraphElement>('.vote-message');
  voteComment.textContent = getUserVoteMessage(userVote);

  const voteInfo = $<HTMLParagraphElement>('.vote-info');
  voteInfo.textContent = `(${userVote}/10)`;
}

export { renderUserVote, renderVoteAverage };
