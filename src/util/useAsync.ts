interface AsyncState<T> {
  loading: boolean;
  error: Error | null;
  data: T | null;
}
const useAsync = async <T>(url: string, options: RequestInit = {}) => {
  const state: AsyncState<T> = {
    loading: true,
    error: null,
    data: null
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    state.data = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      state.error = error;
    }
  } finally {
    state.loading = false;
  }

  return state;
};

export default useAsync;
