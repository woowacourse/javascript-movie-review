export const updateUrl = (params: URLSearchParams) => {
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  history.pushState(null, "", newUrl);
};

export const initUrl = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "F5") {
      history.pushState(null, "", "/");
    }
  });
};
