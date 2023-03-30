const $ = (selectors: string, root: (Document | HTMLElement) = document) => {
  const element = root.querySelector(selectors);

  if (element === null) throw new Error(`'[ERROR] ${selectors}'을(를) 찾을 수 없습니다.`);

  return element;
};

export { $ };
