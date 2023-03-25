import { DUMMY_AMOUNT } from '../../constants/movieChart';
import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { SkeletonMovieComponent } from './action';

const getDummyArray = (num: number) => Array(num).fill('').map(Number);

const SkeletonMovieList = assemble(() => {
  const $events: Event[] = [];
  const $template = getElement(`
      <ul class="item-list">
        ${getDummyArray(DUMMY_AMOUNT)
          .map(
            (_, id) => `
          <fragment id="SkeletonMovie-${id}">
            ${SkeletonMovieComponent({ id })}
          </fragment>
        `
          )
          .join('')}
      <ul>
  `);

  return [$template, $events];
});

export { SkeletonMovieList };
