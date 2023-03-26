import { MOVIE_LOCAL_STORAGE_KEY } from '../constant';

type VoteStarType = {
  voteId: number;
  voteValue: number;
};

const localMemory = {
  getData(id: string) {
    const data = localStorage.getItem(id);

    if (!data) return [];

    return JSON.parse(data);
  },

  setData(id: string, newData: object) {
    localStorage.setItem(id, JSON.stringify(newData));
  },
};

export const localMemoryVoteHook = {
  getVote: (id: number) => {
    const data: VoteStarType[] = localMemory.getData(MOVIE_LOCAL_STORAGE_KEY);

    if (
      data.length === 0 ||
      data.filter(({ voteId }) => Number(voteId) === id).length === 0
    )
      return 0;

    return data.filter(({ voteId }) => voteId === id)[0].voteValue;
  },

  setVote: (id: number, voteValue: number) => {
    const memory = localMemory.getData(String(id));

    const dataSet = {
      voteId: id,
      voteValue,
    };

    memory.push(dataSet);

    localMemory.setData(MOVIE_LOCAL_STORAGE_KEY, memory);
  },
};

export default localMemory;
