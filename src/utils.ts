interface FetcherArgs<T> {
  fn: () => Promise<T>;
  onSuccess: (arg: T) => void;
  onError: (error: Error) => void;
  onLoading: () => void;
}

export function fetcher<T>(arg: FetcherArgs<T>) {
  const { fn, onSuccess, onError, onLoading } = arg;
  onLoading();
  fn()
    .then(onSuccess)
    .catch((e: unknown) => {
      console.error(e);
      onError(e instanceof Error ? e : new Error(String(e)));
    });
}
