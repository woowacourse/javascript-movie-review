import { State } from "../../types/domain";
import { ITEMS } from "../constants/movie";

interface StateStore {
  state: State;
  updateState: (state: Partial<State>) => void;
  getState: () => State;
}

const stateStore: StateStore = {
  state: {
    totalMovies: ITEMS.perPage,
  },

  updateState(state) {
    const keys = Object.keys(state);
    keys.forEach((key) => {
      if (!(key in this.state)) {
        throw new Error("전역 상태로 관리하지 않는 key 입니다.");
      }
    });

    this.state = {
      ...this.state,
      ...state,
    };
  },

  getState() {
    return { ...this.state };
  },
};

export default stateStore;
