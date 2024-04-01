export const hiddenElement = (element: Element | null) => {
  return element?.classList.add('hidden');
};

export const showElement = (element: Element | null) => {
  return element?.classList.remove('hidden');
};
