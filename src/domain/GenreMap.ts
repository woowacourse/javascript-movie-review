const GENRE_LIST_URL = `${process.env.HOST}/${process.env.REQUEST_GENRE_LIST}&language=ko`;

const map = new Map<number, string>();

const fixedGenreList: [number, string][] = [
  [28, '액션'],
  [12, '모험'],
  [16, '애니메이션'],
  [35, '코미디'],
  [80, '범죄'],
  [99, '다큐멘터리'],
  [18, '드라마'],
  [10751, '가족'],
  [14, '판타지'],
  [36, '역사'],
  [27, '공포'],
  [10402, '음악'],
  [9648, '미스터리'],
  [10749, '로맨스'],
  [878, 'SF'],
  [10770, 'TV 영화'],
  [53, '스릴러'],
  [10752, '전쟁'],
  [37, '서부'],
];

const setFixedGenreMap = () => {
  fixedGenreList.forEach(([id, genre]) => map.set(id, genre));
};

const GenreMap = {
  async fetch() {
    if (map.size) return;
  
    await fetch(GENRE_LIST_URL)
      .then((res) => res.json())
      .then((json) => json.genres.forEach(
        (genreInfo: { id: number, name: string }) => map.set(genreInfo.id, genreInfo.name)
      ))
      .catch(() => setFixedGenreMap());
  },

  idToGenre(id: number) {
    return map.get(id) ?? '';
  }
}

export default GenreMap;
