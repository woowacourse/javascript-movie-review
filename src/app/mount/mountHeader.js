import Header from "../../components/header/header";
import Hero from "../../components/hero/hero";
import { $ } from "../../util/querySelector";

export default function mountHeader() {
  const $wrap = $("#wrap");
  $wrap?.prepend(Header());
}
