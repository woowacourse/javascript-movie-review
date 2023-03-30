import { join } from 'cypress/types/bluebird';
import { fetchGenreList, waitFor } from '../apis';
import { useEffect, useState } from '../core';
import { Genres } from '../types/api';
interface DefaultFetchAction {
  (callback: (args: any) => Promise<void>): (args?: any | undefined) => Promise<void>;
}
interface Vote {
  id: number;
  vote: number;
}

function useModal() {
  const [genreList, setGenreList] = useState<Genres>();
  const [myVotes, setMyVotes] = useState<Vote[]>();
  const [isLoading, setIsLoading] = useState(true);

  const defaultFetchAction: DefaultFetchAction =
    <T>(callback: (args: T) => Promise<void>) =>
    async (args?) => {
      setIsLoading(true);
      await callback(args);
      setIsLoading(false);
    };

  const getGenreList = defaultFetchAction(async () => {
    const [data, error] = await waitFor<Genres>(fetchGenreList());
    if (error) throw new Error(JSON.stringify(error));

    setGenreList(data);
  });

  useEffect(() => {
    getGenreList();
    setMyVotes(JSON.parse(localStorage.getItem('myvotes') ?? '[]'));
  }, []);

  return { genreList, isLoading, myVotes, setMyVotes };
}

export { useModal };
