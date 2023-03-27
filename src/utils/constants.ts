export const TMDB_MOVIE_BASE_URL = 'https://api.themoviedb.org/3' as const;

export const STAR_DESCRIPTION: { [key: number]: string } = {
  0: '별점이 없습니다.',
  2: '최악이예요.',
  4: '별로예요.',
  6: '보통이에요.',
  8: '재미있어요.',
  10: '명작이에요.',
} as const;
