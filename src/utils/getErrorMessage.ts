import TMDBError from "../TMDBError";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof TMDBError) {
    return "🚨TMDB에서 데이터를 불러오는 중 에러가 발생했습니다🚨";
  }
  return "🚨알 수 없는 에러가 발생했습니다.🚨";
};
