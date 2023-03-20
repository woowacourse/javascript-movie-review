import { state, StateType } from './Store';

export const subscribeStateInfo = new Set<() => void>();

const subscribe = (fn: () => void) => {
  if (!subscribeStateInfo.has(fn)) {
    subscribeStateInfo.add(fn);
  }
};

export const notify = () => {
  subscribeStateInfo.forEach((fn) => {
    fn();
  });
};

const observerState = (state: StateType) => {
  return (fn: () => void) => {
    return new Proxy(state, {
      get(target: StateType, prop: keyof StateType) {
        subscribe(fn);
        return target[prop];
      },

      set<T extends keyof StateType>(
        target: StateType,
        prop: T,
        value: StateType[T]
      ) {
        target[prop] = value;

        return true;
      },
    });
  };
};

export const store = observerState(state);
