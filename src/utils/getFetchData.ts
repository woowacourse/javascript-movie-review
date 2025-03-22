/// <reference types="vite/client" />

export async function getFetchData<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("HTTP-Error: " + response.status);
  }

  const jsonData = await response.json();
  return jsonData;
}
