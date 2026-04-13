import { getMoviePopular } from "./api";

export const queryMoviePopular = () => {
  let isFetching = false;

  const refetch = async ({ page }: { page: number }) => {
    if( isFetching ) return;

    isFetching = true;

    try {
      const movies = await getMoviePopular({ page });
      return movies
    } finally{
      isFetching = false;
    }
  }

  return { refetch };
}