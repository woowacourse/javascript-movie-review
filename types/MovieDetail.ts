/*
- 포스터 => poster_path
- 타이틀 => title 
- 몇년도 및 장르 => release_date // "2023-02-15” 형식 & genres[]
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    }
  ],
- 평균 평점 => vote_average
- 줄거리 => overview
 */

export interface MovieDetail {
  poster_path: string;
  title: string;
  release_date: string;
  genres: [];
  vote_average: number;
  overview: string;
}
