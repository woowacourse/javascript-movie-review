export function toURLSearchParams<T extends object>(
  params: T,
): URLSearchParams {
  return new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  );
}
