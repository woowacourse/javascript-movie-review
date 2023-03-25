import { persisted } from './decorators/persisted';
import { VotesSubject } from './domain/VotesSubject';

export const votes$ = persisted('votes', new VotesSubject());
