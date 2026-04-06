export const Error = () => {
  const $div = document.createElement('div');
  $div.className = 'nothing';
  $div.innerHTML = `
    <img src="./images/empty.png" alt="nothing" />
    <p> 데이터 전송 중 문제가 생겼습니다!!</p>
  `;

  return $div;
};
