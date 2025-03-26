type RedirectWithQueryParams = {
  path: string;
  query: Record<string, string>;
};

export default function redirectWithQuery({
  path,
  query,
}: RedirectWithQueryParams) {
  const queryString = new URLSearchParams(query).toString();
  window.location.href = `${path}?${queryString}`;
}
