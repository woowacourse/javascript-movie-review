export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    return {
      isError: true,
      data,
    } as T;
  }

  return {
    isError: false,
    data,
  } as T;
};
