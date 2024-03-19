// {
//     "adult": false,
//     "backdrop_path": "/gJL5kp5FMopB2sN4WZYnNT5uO0u.jpg",
//     "genre_ids": [1, 2],
//     "id": 1011985,
//     "original_language": "en",
//     "original_title": "Kung Fu Panda 4",
//     "overview": "",
//     "popularity": 3781.812,
//     "poster_path": "/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg",
//     "release_date": "2024-03-02",
//     "title": "쿵푸팬더 4",
//     "video": false,
//     "vote_average": 6.882,
//     "vote_count": 161
// }

type TGenre =
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'TV Movie'
  | 'Thriller'
  | 'War'
  | 'Western';

// 제목, 평점, 이미지, 장르, 설명, id
interface IMovie {
  id: number;
  title: string;
  imageSrc: string;
  rating: number;
  genre: TGenre;
  description: string;
}
