import Hero from "../../components/hero/hero";
import { $ } from "../../util/querySelector";

export default function mountHero() {
  const $wrap = $("#wrap");
  $wrap?.prepend(Hero());
}
