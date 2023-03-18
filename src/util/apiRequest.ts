export const request = async (url: string) => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  throw new Error("error");
};
