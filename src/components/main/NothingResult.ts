export const NothingResult = () => {
  const $div = document.createElement('div');
  $div.className = 'nothing';
  $div.innerHTML = `
    <img src="./images/empty.png" alt="nothing" />
    <p>검색 결과가 없습니다.</p>
  `;

  return $div;
};
