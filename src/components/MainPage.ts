import { ItemList } from './ItemList';
import { PageHeader } from './PageHeader';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageHeader()}
        ${ItemList()}
    </section>
    `;
}
