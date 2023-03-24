const fetchApi = async (url) => {
  if (!navigator.onLine) throw new Error("Network Error");
  try {
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    throw new Error("Server Error");
  }
};

export default fetchApi;
