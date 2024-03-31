import { MovieDetailData, UserScoreParams } from './MovieInterface';

export interface ModalParams {
  title?: string;
  id: string;
}

export interface MovieDetailContainerParams {
  movie: MovieDetailData;
  onClose: () => void;
  onUpdateUserScore: ({ movieId, userScore }: UserScoreParams) => void;
}
