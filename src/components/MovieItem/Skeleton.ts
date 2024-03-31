export const movieItemskeletonTemplate = () => {
  const skeletonItemBox = document.createElement('li');
  skeletonItemBox.innerHTML = /* html */ `
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>`;
  return skeletonItemBox;
};
