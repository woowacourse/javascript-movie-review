const MovieSkeleton = () => {
  return `
    <li class="skeleton">
      <a href="javascript:void(0)">
        <div class="item-card">
          <div class="item-thumbnails skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>
    `;
};

export default MovieSkeleton;
