import { toElement } from "../utils/domUtils";
import Skeleton from "./Skeleton";

export default function ModalSkeleton() {
  const skeletonItem = Skeleton({ width: "100%", height: "160px" });

  return toElement(`
    <div class="modal-skeleton">
        ${Skeleton({ width: "40%", height: "500px" })}
        <skeleton>
            ${skeletonItem}
            ${skeletonItem}
            ${skeletonItem}
        </skeleton>
    </div>
    `);
}
