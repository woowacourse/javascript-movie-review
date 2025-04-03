export default function getSearchParams(key: string): string {
  return new URLSearchParams(window.location.search).get(key) ?? "";
}
