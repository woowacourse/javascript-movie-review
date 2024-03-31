function createMovieDetailSkeleton() {
  const skeleton = document.createElement('div');
  skeleton.innerHTML = `<div class="movie-modal">
    <div class="movie-detail-header flex-XY-aligned">
      <div class="custom-skeleton h-20 w-100"></div>
      <button class="flex-XY-aligned close-button transition-background">
        <img src="/009bf62bd786c8837153.svg" alt="close-button" />
      </button>
    </div>
    <div class="flex-XY-aligned padding-32 gap-16">
      <div>
        <img
          class="h-433 w-292 custom-skeleton"
        />
      </div>
      <div class="movie-detail-info w-396">
        <div class="custom-skeleton h-20 w-100"></div>
        <div>
          <div class="custom-skeleton h-20 w-396"></div>
        </div>
        <div class="flex-Y-center user-rate-box custom-skeleton"></div>
      </div>
    </div>
  </div>`;
  return skeleton;
}

export default createMovieDetailSkeleton;
