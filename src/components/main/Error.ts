export const Error = (message: string = '에러가 났습니다') => {
  const $div = document.createElement('div');
  $div.className = 'nothing';
  $div.innerHTML = `
    <img src="./images/empty.png" alt="nothing" />
    <p> ${message}</p>
  `;

  return $div;
};
