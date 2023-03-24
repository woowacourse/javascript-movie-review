const fetchApi = async (url) => {
  if (!navigator.onLine) throw new Error("Offline Error");
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    throw new Error("Response Error");
  }
};

export default fetchApi;
