import { UserScoreList } from '../type/Movie';

const LOCAL_STORAGE_KEYS = { USER_SCORE_MAP: 'userScoreList' };

const item = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_SCORE_MAP);
const userScoreList: UserScoreList = item ? JSON.parse(item) : {};

const UserDataHandler = {
  saveUserScore(id: number, userScore: number) {
    userScoreList[id] = userScore;

    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_SCORE_MAP, JSON.stringify(userScoreList));
  },

  loadUserScore(id: number) {
    return userScoreList[id] || null;
  },
};

export default UserDataHandler;
