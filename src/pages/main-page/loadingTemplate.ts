const skeletonItems = Array(20)
  .fill('')
  .map(
    () => `
  <li>
    <div class="item">
      <img class="thumbnail skeleton" >
      <div class="item-desc">
        <p class="skeleton">
          <img src="" class="">
          <span class="skeleton"></span>
        </p>
        <strong class="item-title skeleton"></strong>
      </div>
    </div>
  </li>
`,
  )
  .join('');

const mainPageLoadingTemplate = `
  <div class="render-content">
    <div class="main-page">
      <div class="main-banner">
        <div class="overlay" aria-hidden="true">
          <img class="main-banner__image skeleton" >
        </div>

        <div class="main-banner__info">
          <div class="main-banner__rate">
            <img src="" class="">
            <span class="main-banner__rate-value text-subtitle"></span>
          </div>
          <div class="main-banner__title text-title"></div>
        </div>
      </div>

      <div>
        <h2 class="title">지금 인기 있는 영화</h2>
      </div>

      <main>
        <ul class="thumbnail-list">
          ${skeletonItems}
        </ul>
      </main>
    </div>
  </div>
`;

export default mainPageLoadingTemplate;
