import createDOMElement from "../../util/createDomElement";
import Spinner from "../Spinner";

const DetailLoadingModal = () => {
  return createDOMElement({
    tag: "div",
    class: "modal-background loading active",
    id: "modalBackground",
    children: Spinner(),
  });
};

export default DetailLoadingModal;
