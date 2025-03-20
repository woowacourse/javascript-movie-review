// components/ListTitle.js
const ListTitle = ({ query }) => {
  const title = query ? `"${query}" 검색 결과` : "지금 인기 있는 영화";
  return /* html */ `
    <h2 id="list-title">${title}</h2>
  `;
};

export default ListTitle;
