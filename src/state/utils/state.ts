import { deepCopy } from "../../utils/deepCopy";

export const createStore = <StateType>(initialState: StateType) => {
  if (typeof initialState === "function" || typeof initialState === "symbol")
    throw new Error("초기값은 함수가 아닌 객체 혹은 원시값이어야 합니다.");

  let state = deepCopy(initialState);

  const getter = () => deepCopy(state);

  const modify = (
    update: StateType | ((prevState: StateType) => StateType),
  ) => {
    if (typeof update === "function") {
      state = deepCopy((update as (prevState: StateType) => StateType)(state));
      return;
    }
    state = deepCopy(update);
  };

  return [getter, modify] as const;
};
