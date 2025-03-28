import Store from "../store/store";

const isScrolledToBottom = (threshold: number = 180): boolean => {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - threshold
  );
};

const getCurrentPage = (moviesLength: number, unit: number): number => {
  return Math.floor(moviesLength / unit) + 1;
};

const getCurrentScore = (id: string, store: Store): number => {
  const scores = store.getState().starRatings || [];
  return scores.find((rating) => rating.id === id)?.score || 0;
};

async function withLoading<T>(
  store: Store,
  asyncFunc: () => Promise<T>
): Promise<T> {
  store.setState({ loading: true });
  try {
    const result = await asyncFunc();
    return result;
  } finally {
    store.setState({ loading: false });
  }
}

const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): T => {
  let timeoutId: number;
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  }) as T;
};

export {
  isScrolledToBottom,
  getCurrentPage,
  getCurrentScore,
  withLoading,
  debounce
};
