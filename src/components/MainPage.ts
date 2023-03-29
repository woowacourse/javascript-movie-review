import { itemList } from './itemList';
import { pageHeader } from './pageHeader';

export function mainPage() {
  return `
    <section class="item-view">
        ${pageHeader()}
        ${itemList()}
    </section>
    `;
}
