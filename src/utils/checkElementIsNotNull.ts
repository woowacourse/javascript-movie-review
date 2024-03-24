const checkElementIsNotNull = ($element: Element | null) => {
  if (!$element) {
    const message = `${$element}를 찾을 수 없습니다. 새로고침을 해주세요.`;
    alert(message);
  }
};

export default checkElementIsNotNull;
