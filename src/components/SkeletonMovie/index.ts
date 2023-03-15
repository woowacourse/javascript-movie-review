import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';

const SkeletonMovie = assemble(() => {
  const $events: Event[] = [];
  const $template = getElement(`
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
  `);

  return [$template, $events];
});

export { SkeletonMovie };
