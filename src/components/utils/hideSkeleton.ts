import { $$ } from "../../utils/dom";

const hideSkeleton = () => {
  $$(".skeleton")?.forEach((s) => s.remove());
};

export default hideSkeleton;
