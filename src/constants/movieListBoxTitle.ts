const MOVIE_LIST_BOX_TITLE = {
  popular: "지금 인기있는 영화",
  search: (query: string) => `"${query}" 검색 결과`,
} as const;

export default MOVIE_LIST_BOX_TITLE;
