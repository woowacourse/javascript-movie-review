class MovieSkeleton {
  template () {
    return `
    <li class="skeleton">
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>
    `;
  }
}

export default MovieSkeleton;
