import Header from "../../components/header/header";
import { $ } from "../../util/querySelector";

export default function mountHeader() {
  const $wrap = $("#wrap");
  $wrap?.prepend(Header());
}
