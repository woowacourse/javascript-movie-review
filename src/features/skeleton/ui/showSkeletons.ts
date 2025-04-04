import { createSkeletons } from "./createSkeletons";

export function showSkeletons($container: HTMLElement, count: number = 20) {
  $container.appendChild(createSkeletons(count));
}
