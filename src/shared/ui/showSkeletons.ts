import { createSkeletons } from "./createSkeletons";

export function showSkeletons($container: HTMLElement, count: number = 10) {
  $container.appendChild(createSkeletons(count));
}
