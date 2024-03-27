interface Score {
  title: string;
  score: number;
}

const MovieScoresCollection = {
  getAllScores(): Score[] {
    return JSON.parse(localStorage.getItem('scores') ?? '[]');
  },

  setOneScore(newScore: Score): void {
    const allScores: Score[] = this.getAllScores();
    if (this.hasScore(newScore.title)) {
      localStorage.setItem(
        'scores',
        JSON.stringify(allScores.filter((score) => score.title !== newScore.title)),
      );
    }
    allScores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(allScores));
  },

  hasScore(name: string): boolean {
    return this.getAllScores().some((score) => score.title === name);
  },

  getScoreByTItle(name: string) {
    return this.getAllScores().find((score) => score.title === name)?.score;
  },
};
export default MovieScoresCollection;
