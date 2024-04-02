export const hideEmptyResult = () => {
  const emptyResultContainer = document.querySelector<HTMLDivElement>("#empty-result");

  if (!emptyResultContainer) return;

  emptyResultContainer.classList.add("hidden");
  emptyResultContainer.innerText = "";
};

export const renderEmptyResult = (searchKeyword: string) => {
  const emptyResultContainer = document.querySelector<HTMLDivElement>("#empty-result");
  if (!emptyResultContainer) return;

  emptyResultContainer?.classList.remove("hidden");
  const emptyText = `${searchKeyword} 에 대한 검색 결과가 존재하지 않아요..😅\n정확한 검색어를 다시 입력해주세요`;
  emptyResultContainer.innerText = emptyText;
};
