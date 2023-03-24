import { VotesSubject } from './domain/VotesSubject';
import { persisted } from './persisted';

export const votes$ = persisted('votes', new VotesSubject());
