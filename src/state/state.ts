import { Movie } from '../types/movie';

export const movie: Movie = { list: [''], query: '', currentPage: 1, totalPages: 1, isClicked: false };

export const proxy: { movie: Movie } = {
  movie: { list: [''], query: '', currentPage: 1, totalPages: 1, isClicked: false },
};

export const observer: { viewport: IntersectionObserver | null } = {
  viewport: null,
};
