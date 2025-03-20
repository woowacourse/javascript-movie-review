import createElement from "./utils/createElement";

const SkeletonMovieItem = () => {
    const $div = createElement({
        tag: 'div'
    })
    
    $div.innerHTML  =`
                  <li>
                    <div class="item">
                      <div class="thumbnail skeleton"></div>
                      <div class="item-desc">
                        <p class="rate">
                          <div class="skeleton skeleton-star"></div>
                        <div class="skeleton skeleton-text-title"></div>
                      </div>
                    </div>
                  </li>
        `;
    
        return $div;

}


export default SkeletonMovieItem;