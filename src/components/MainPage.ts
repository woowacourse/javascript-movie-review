import { movieItemList } from './movieItemList';
import { pageHeader } from './pageHeader';

export function mainPage() {
  return `
    <section class="item-view">
        ${pageHeader()}
        ${movieItemList()}
    </section>
    `;
}
