import { toElement } from "../utils/domUtils";
import Skeleton from "./Skeleton";

export default function ModalSkeleton() {
  return toElement(`
    <div class="modal-skeleton">
        ${Skeleton({ width: "40%", height: "500px" })}
        <skeleton>
            ${Skeleton({ width: "100%", height: "160px" })}
            ${Skeleton({ width: "100%", height: "160px" })}
            ${Skeleton({ width: "100%", height: "160px" })}
        </skeleton>
    </div>
    `);
}
