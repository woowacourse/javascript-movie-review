import { Movie } from './movie';

export type MovieProxy = Movie & Record<string, string>;
