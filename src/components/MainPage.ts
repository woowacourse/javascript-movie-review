import { PageHeader } from './PageHeader';
import { ViewMoreButton } from './ViewMoreButton';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageHeader()}
        <ul class="item-list">
        </ul>
        ${ViewMoreButton()}
    </section>
    `;
}
