class MovieSkeleton {
  template () {
    return `
    <li class="skeleton">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </li>
    `;
  }
}

export default MovieSkeleton;
