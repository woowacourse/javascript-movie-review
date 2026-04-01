export const fetcher = async <T, U>(endpoint: string, options: RequestInit) => {
  const defaultOptions = {
    method: "GET",
    ...options,
    headers: {
      accept: "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, defaultOptions);
    if (response.ok) {
      const data: T = await response.json();
      return data;
    }
    const error: U = await response.json();
    return error;
  } catch (error) {
    throw error;
  }
};
