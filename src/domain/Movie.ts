import { RemoteMovieInfoByKeyword, RemotePopularMovieInfo } from '../apis/movieChart.type';
import { addData, getData } from '../utils/common/localStorage';

export type PopularMovieInfo = RemotePopularMovieInfo & { my_vote: number };
export type MovieInfoByKeyword = RemoteMovieInfoByKeyword & { my_vote: number };

export type MovieInfo = PopularMovieInfo | MovieInfoByKeyword;
export type MyVote = Pick<MovieInfo, 'id' | 'my_vote'>;

export class Movie {
  movieInfo: MovieInfo;

  constructor(movieInfo: RemotePopularMovieInfo | RemoteMovieInfoByKeyword) {
    this.movieInfo = Object.assign(movieInfo, { my_vote: getMyVote(movieInfo.id) });
  }

  getMovieId(): MovieInfo['id'] {
    return this.movieInfo.id;
  }

  setMovieVote(payload: MyVote) {
    setMyVote(payload);
  }
}

const getMyVote = (id: number) => {
  const myVotes = getData('my_votes', []);
  const [myVoteInfo]: MyVote[] = myVotes.filter((my_vote: MyVote) => my_vote.id === id);

  return myVoteInfo?.my_vote ?? 0;
};

const setMyVote = ({ id, my_vote }: Pick<MovieInfo, 'id' | 'my_vote'>) => {
  const myVotes = getData('my_votes', []);

  addData([...myVotes, { [id]: my_vote }]);
};
