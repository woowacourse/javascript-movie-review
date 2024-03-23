export const getData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};
