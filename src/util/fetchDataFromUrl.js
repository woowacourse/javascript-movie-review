export default async function fetchDataFromUrl(url, query) {
  const queryUrl = url + '?' + new URLSearchParams(query);
  const response = await fetch(queryUrl);
  const { total_pages, results } = await response.json();
  return { total_pages, results };
}
