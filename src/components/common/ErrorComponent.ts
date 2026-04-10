import TMDBError from '../../api/TMDBError';

export const ErrorComponent = (error: Error | TMDBError) => {
  const $div = document.createElement('div');
  const infoMessage = error instanceof TMDBError ? 'TMDB 에러' : '예상치못한 에러';
  $div.className = 'nothing';
  $div.innerHTML = `
    <img src="./images/empty.png" alt="nothing" />
    <p>${infoMessage}</p>
  `;

  return $div;
};
