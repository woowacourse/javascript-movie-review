interface Props {
  onCloseButtonClick: () => void;
}

const MovieDetailSkeleton = ({ onCloseButtonClick }: Props) => {
  const container = document.createElement('div');
  const titleContainer = document.createElement('div');
  const h2 = document.createElement('h2');
  const closeButton = document.createElement('button');

  titleContainer.classList.add('movie-detail-title-container');
  h2.classList.add('movie-detail-title', 'skeleton');
  closeButton.classList.add('movie-detail-close-button');

  closeButton.innerHTML = /* html */ `
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7665 1.54966L12.38 0L6.88315 6.14368L1.38632 0L-0.000183105 1.54966L5.49665 7.69333L-0.000183105 13.837L1.38632 15.3867L6.88315 9.24299L12.38 15.3867L13.7665 13.837L8.26965 7.69333L13.7665 1.54966Z" fill="#F1F1F1"/>
    </svg>
  `;

  closeButton.addEventListener('click', () => onCloseButtonClick());

  titleContainer.appendChild(h2);
  titleContainer.appendChild(closeButton);

  container.appendChild(titleContainer);

  container.classList.add('movie-detail-container');
  container.insertAdjacentHTML(
    'beforeend',
    /* html */ `
    <div class="movie-detail-content">
      <div class="movie-detail-poster skeleton">
      </div>
      <div class="movie-detail-description">
        <div class="movie-detail-text-content">
          <div class="genre-info skeleton"></div>
          <p class="overview skeleton"></p>
        </div>
        <div class="review-container skeleton"></div>
      </div>
    </div>
  `,
  );

  return container;
};

export default MovieDetailSkeleton;
