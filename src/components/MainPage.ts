import { MovieList } from './MovieList';
import { PageTitle } from './PageTitle';
<<<<<<< HEAD
=======
import { ViewMoreButton } from './ViewMoreButton';
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790

export function MainPage() {
  return `
    <section class="item-view">
        ${PageTitle()}
        ${MovieList()}
<<<<<<< HEAD
=======
        ${ViewMoreButton()}
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
    </section>
    `;
}
