const deleteParams = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("query")) {
    params.delete("query");
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  }
};

export default deleteParams;
