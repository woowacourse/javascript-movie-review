export const MovieItemSkeleton = () => {
  const $li = document.createElement('li');

  $li.innerHTML = `
    <div class="item skeleton">
      <div class="thumbnail"></div> <div class="item-desc">
        <div class="rate"></div>
        <div class="title"></div>
      </div>
    </div>
  `;

  return $li;
};
