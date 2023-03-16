export const fetchData = async (url) => {
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
