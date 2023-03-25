import { PageHeader } from './PageHeader';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageHeader()}
        <ul class="item-list">
        </ul>
    </section>
    `;
}
