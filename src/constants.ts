export const MAX_MOVIES_PER_PAGE = 20;

export const POPULAR_TITLE = '지금 인기 있는 영화';

export const SKELETON_TEMPLATE = /* html */ `
  <li>
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>
  </li>
  `.repeat(MAX_MOVIES_PER_PAGE);
