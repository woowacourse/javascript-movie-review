import { persisted } from './decorators/persisted';
import { MoviesSubject } from './domain/MoviesSubject';
import { VotesSubject } from './domain/VotesSubject';
import { Subject } from './Subject';

export const votes$ = persisted('votes', new VotesSubject());

export const currentMovies$ = new Subject<{ title: string; movies$: MoviesSubject }>();
