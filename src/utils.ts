interface FetcherArgs<T> {
  fn: () => Promise<T>;
  onSuccess: (arg: T) => void;
  onError: (error: Error) => void;
  onLoading: () => void;
}

export function fetcher<T>(arg: FetcherArgs<T>) {
  const { fn, onSuccess, onError, onLoading } = arg;
  onLoading();
  fn().then(onSuccess).catch(onError);
}
