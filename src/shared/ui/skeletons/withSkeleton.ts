import { removeSkeletons } from "./removeSkeletons";
import { showSkeletons } from "./showSkeletons";

export async function withSkeleton<T>(
  container: HTMLElement,
  asyncFunction: Promise<T>
): Promise<T | undefined> {
  try {
    showSkeletons(container);
    const result = await asyncFunction;
    removeSkeletons();
    return result;
  } catch (error) {
    removeSkeletons();
    throw error;
  }
}
