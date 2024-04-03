import { SETTING } from '../../constants/constant';

const Skeleton = () => {
  const skeleton = render();
  return skeleton;
};

const render = () => {
  const skeletonHTML = `            
  <li class='skeleton-list none'>
    <a href="#">
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>
  </li>
  `.repeat(SETTING.FETCH_ITEM_COUNT);

  return skeletonHTML;
};

export default Skeleton;
