import Modal from "../../components/modal/modal";
import Hero from "../../components/hero/hero";
import { $ } from "../../util/querySelector";

export default function mountModal(modal) {
  const $wrap = $("#wrap");
  $wrap?.append(modal.$el);
}
