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

const searchPageLoadingTemplate = (searchInput: string) => {
  return `
  <div class="render-content">
    <div class="search-page">
      <div>
        <h2 class="title">"${searchInput}" 검색 결과</h2>
      </div>

      <main>
        <ul class="thumbnail-list">
          ${skeletonItems}
        </ul>
      </main>
    </div>
  </div>
  `;
};
export default searchPageLoadingTemplate;
