export const $ = ({ root = document, selector }: { root?: Document | Element; selector: string }) => {
  return root.querySelector(selector);
};
