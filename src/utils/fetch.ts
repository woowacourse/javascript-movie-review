const ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
};
