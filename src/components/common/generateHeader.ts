import createElement from "../utils/createElement";

const generateHeader = ({ children }: { children: HTMLElement[] }) => {
  return createElement({
    tagName: "header",
    children,
  });
};

export default generateHeader;
