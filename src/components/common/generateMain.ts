import createElement from "../utils/createElement";

const generateMain = ({ children }: { children: HTMLElement[] }) => {
  return createElement({
    tagName: "main",
    children,
  });
};

export default generateMain;
