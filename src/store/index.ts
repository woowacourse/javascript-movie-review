import { publisher } from './publisher';
import { subscriber } from './subscriber';

const state = new publisher({
  a: 10,
  b: 20,
});

const adder = new subscriber(() => console.log(`a + b = ${state.a + state.b}`));
const multiplier = new subscriber(() => console.log(`a * b = ${state.a * state.b}`));

adder.subscribe(state);
multiplier.subscribe(state);

state.subscriber_notify();
// a + b = 30
// a * b = 200

state.change({ a: 100, b: 200 });
// a + b = 300
// a * b = 20000
