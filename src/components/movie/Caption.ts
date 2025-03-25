import { createElement } from "../../utils/createElement";

type Props = {
  title: string;
};

const Caption = ({ title }: Props) => {
  return createElement(/*html*/ `
    <h2 id="caption">${title}</h2>  
  `);
};

export default Caption;
