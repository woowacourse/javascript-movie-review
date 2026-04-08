interface FetcherArgs<T> {
  fn: () => Promise<T>;
  onSuccess?: (arg: T) => void;
  onError?: (error: Error) => void;
  onLoading?: () => void;
}

export async function fetcher<T>(arg: FetcherArgs<T>): Promise<T> {
  const { fn, onSuccess, onError, onLoading } = arg;
  onLoading && onLoading();
  try {
    const response = await fn();
    onSuccess && onSuccess(response);
    return response;
  } catch (error) {
    console.error(error);
    onError &&
      onError(error instanceof Error ? error : new Error(String(error)));
    throw error;
  }
}
