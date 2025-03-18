const $EmptyList = () => {
  const emptyPlanet = createElement("img", {
    src: "./images/empty-planet.svg",
    className: "empty-planet",
    alt: "검색 결과가 없습니다.",
  });
  const emptyText = createElement("h2", {
    textContent: "검색 결과가 없습니다.",
  });

  const box = createElement("div", {
    className: "empty-box",
  });
  box.append(emptyPlanet, emptyText);

  return box;
};

export default $EmptyList;
