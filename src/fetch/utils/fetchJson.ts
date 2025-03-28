export default async function fetchJson<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP 오류: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
