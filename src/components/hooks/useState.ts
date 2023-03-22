import { notify } from '../atoms/Observer';
import { StateType } from '../atoms/Store';

export const useStateHook = (observerState: StateType) => {
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
