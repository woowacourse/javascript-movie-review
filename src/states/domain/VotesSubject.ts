import { Vote } from '../../domain/vote.type';
import { Subject } from '../Subject';

export class VotesSubject extends Subject<Record<Vote['movieId'], Vote['value']>> {
  constructor() {
    super();
  }

  nextVote(vote: Vote) {
    this.next({
      ...this.state,

      [vote.movieId]: vote.value,
    });
  }
}
