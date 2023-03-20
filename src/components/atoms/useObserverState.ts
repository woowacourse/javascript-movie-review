import { notify } from './Observer';
import { StateType } from './Store';

export const useObserverState = (observerState: StateType) => {
  return {
    getValue: <T extends keyof StateType>(key: T): StateType[T] => {
      return observerState[key];
    },

    setValue: <T extends keyof StateType>(key: T, newData: StateType[T]) => {
      observerState[key] = newData;
    },

    emit: () => {
      notify();
    },
  };
};
