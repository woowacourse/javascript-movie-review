import { createModalCloseButton } from './movieDetail';

function createImageSkeleton() {
  const div = document.createElement('div');
  div.className = 'movie-detail-header flex-XY-aligned';
  div.innerHTML = `
      <div class="custom-skeleton h-20 w-100"></div>`;
  div.append(createModalCloseButton());
  return div;
}

function createInfoSkeleton() {
  const div = document.createElement('div');
  div.className = 'flex-XY-aligned padding-32 gap-16';
  div.innerHTML = ` 
  <div>
    <img class="h-433 w-292 custom-skeleton mobile-display-none"/>
  </div>
  <div class="movie-detail-info w-1-ratio h-433">
    <div class="custom-skeleton h-20 w-1-ratio"></div>
    <div class="custom-skeleton h-20 w-1-ratio"></div>
    <div class="flex-Y-center user-rate-box custom-skeleton"></div>
  </div>
  `;
  return div;
}

function createMovieDetailSkeleton() {
  const skeleton = document.createElement('div');
  skeleton.className = 'movie-modal';
  skeleton.append(createImageSkeleton(), createInfoSkeleton());
  return skeleton;
}

export default createMovieDetailSkeleton;
