export default function renderSearchInput(query: string) {
  const searchInput = document.querySelector<HTMLInputElement>(".search-input");
  if (searchInput) searchInput.value = query;
}