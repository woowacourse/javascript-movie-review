const LOCAL_STORAGE_KEYS = { USER_SCORE_MAP: 'userScoreMap' };

const item = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_SCORE_MAP);
const userScoreMap: Map<number, number> = item ? JSON.parse(item) : new Map();

const UserDataHandler = {
  saveUserScore(id: number, userScore: number) {
    userScoreMap.set(id, userScore);

    localStorage.setItem('userScoreMap', JSON.stringify(userScoreMap));
  },

  loadUserScore(id: number) {
    return userScoreMap.get(id) || null;
  },
};

export { LOCAL_STORAGE_KEYS, UserDataHandler };
