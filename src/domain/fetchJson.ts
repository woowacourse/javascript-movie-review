type FetchJson = <T>(url: string) => Promise<T>;

const fetchJson: FetchJson = async api => {
  const response = await fetch(api);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

export default fetchJson;
