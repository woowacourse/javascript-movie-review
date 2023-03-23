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

export const MODAL_SKELETON_TEMPLATE = /* html */ `
  <header class="modal-header"></header>
  <div class="detail-container">
    <figure class="modal-thumbnail-wrapper">
      <img class="modal-thumbnail skeleton" alt="" />
    </figure>
    <section class="movie-detail">
      <div class="flex align-center">
        <p class="skeleton"></p>
        <p class="vote-average skeleton"></p>
      </div>
      <div class="overview skeleton"></div>
      <section class="vote skeleton"></section>
    </section>
  </div>
`;
