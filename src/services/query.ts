import { getMoviePopular } from "./api";

export const queryMoviePopular = () => {
  let isFetching = false;

  const refetch = async ({ page }: { page: number }) => {
    if( isFetching ) return;

    isFetching = true;

    const movies = await getMoviePopular({ page });

    isFetching = false;

    return movies;
  }

  return { refetch };
}