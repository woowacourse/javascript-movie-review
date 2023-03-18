export const fetchData = async <T>(url: string): Promise<{ isError: boolean; data: T }> => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw {
      isError: true,
      data,
    };
  }

  return {
    isError: false,
    data,
  };
};
