import { $ } from "../../util/querySelector";
import Fallback from "./fallback";

export default function showFallback(text) {
  $("#thumbnail-container")?.replaceChildren(Fallback(text));
}
