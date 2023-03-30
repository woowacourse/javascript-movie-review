export interface PersonalVoteData {
  id: string;
  starCount: StarCount;
}

export type StarCount = 0 | 1 | 2 | 3 | 4 | 5;

export default class PersonalVoteHandler {
  constructor(private personalVoteData: PersonalVoteData[] = []) {}

  getPersonalVoteData() {
    return this.personalVoteData;
  }

  getStarCountById(movieId: string) {
    const result = this.personalVoteData.find((data) => data.id === movieId);

    if (!result) return 0;

    return result.starCount;
  }

  updatePersonalVoteData(movieId: string, starCount: StarCount) {
    const duplecateRemoved = this.personalVoteData.filter((data) => data.id !== movieId);

    this.personalVoteData = [...duplecateRemoved, { id: movieId, starCount }];
  }
}
