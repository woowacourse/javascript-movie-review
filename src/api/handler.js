export const getRequest = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          reject({ status: "fail" });
        }
        return res;
      })
      .then((res) => res.json())
      .then((result) => resolve({ status: "success", ...result }))
      .catch(() => reject({ status: "fail" }));
  });
};

export const transData = (payload) => {
  if (payload.status === "fail") {
    return { status: "fail" };
  }
  return {
    status: "success",
    results: payload.results.map(
      ({ poster_path, id, title, vote_average }) => ({
        poster_path,
        id,
        title,
        vote_average,
      })
    ),
    totalPage: payload.total_pages,
  };
};
