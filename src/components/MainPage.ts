import { MovieList } from './MovieList';
import { PageTitle } from './PageTitle';

export function MainPage() {
  return `
    <section class="item-view">
        ${PageTitle()}
        ${MovieList()}
    </section>
    `;
}
