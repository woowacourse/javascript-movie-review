export function getApiOptions(token) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return options;
}

export function getPopularParam(currentPage) {
  return {
    language: "ko-KR",
    page: currentPage,
  };
}

export function getSearchParam(inputValue, currentPage) {
  return {
    query: inputValue,
    page: currentPage,
    language: "ko-KR",
    include_adult: "false",
  };
}
