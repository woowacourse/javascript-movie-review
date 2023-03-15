import { assemble, Event, useState } from '../../core';
import { getElement } from './../../utils/common/domHelper';

const App = assemble(() => {
  const $events: Event[] = [];
  const $template = getElement(``);

  return [$template, $events];
});

export { App };
