import { EmptyStar, FilledStar } from '../assets';
import { USER_VOTE_MESSAGE } from '../constants/movieInformation';
import { $, $$ } from '../utils/domSelector';

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

  Array.from({ length: 5 }, (_, index) => {
    if (index < userVoteCount) {
      userStars.push(
        `<img src="${FilledStar}" class="user-vote-star" alt="별점" data-star-index="${index}" />`
      );
    } else {
      userStars.push(
        `<img src="${EmptyStar}" class="user-vote-star" alt="별점" data-star-index="${index}" />`
      );
    }
  });

  return userStars;
}

function renderUserVote(userVote: number) {
  const userVoteCount = userVote / 2;

  const voteStarsContainer = $<HTMLDivElement>('.vote-stars');
  voteStarsContainer.replaceChildren();
  voteStarsContainer.insertAdjacentHTML(
    'afterbegin',
    userVoteStarsTemplate(userVoteCount).join('')
  );

  const voteComment = $<HTMLParagraphElement>('.vote-message');
  voteComment.textContent = getUserVoteMessage(userVote);

  const voteInfo = $<HTMLParagraphElement>('.vote-info');
  voteInfo.textContent = `(${userVote}/10)`;
}

function updateUserVoteStars(updatedUserVoteCount: number) {
  const userStars = $$<HTMLImageElement>('.temp-star');

  userStars.forEach((star, index) => {
    if (index <= updatedUserVoteCount) {
      star.src = FilledStar;
    } else {
      star.src = EmptyStar;
    }
  });
}

export { renderUserVote, renderVoteAverage, updateUserVoteStars, userVoteStarsTemplate };
