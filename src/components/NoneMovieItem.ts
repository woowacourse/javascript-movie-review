const NoneMovieItem = () => {
  const $noItem = document.createElement("li");
  $noItem.textContent = "검색 결과가 없습니다.";

  return $noItem;
};

export default NoneMovieItem;
