export function getApiOptions(token) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return options;
}
