const fetchApi = async (url) => {
  if (!navigator.onLine) throw new Error("현재 네트워크에 연결되어 있지 않습니다.");

  const response = await fetch(url);
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.status_message);
  }
  return response.json();
};

export default fetchApi;
