import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { MovieComponent } from './action';

const MovieChart = assemble(() => {
  const $events: Event[] = [];

  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
          <fragment id="Movie">
            ${MovieComponent({
              info: {
                adult: false,
                backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
                genre_ids: [28, 12, 878],
                id: 505642,
                original_language: 'en',
                original_title: 'Black Panther: Wakanda Forever',
                overview:
                  'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
                popularity: 1947.255,
                poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
                release_date: '2022-11-09',
                title: 'Black Panther: Wakanda Forever',
                video: false,
                vote_average: 7.3,
                vote_count: 4083,
              },
            })}
          </fragment>
        </ul>
        <button class="btn primary full-width">더 보기</button>
      </section>
    </main>
  `);

  return [$template, $events];
});

export { MovieChart };
