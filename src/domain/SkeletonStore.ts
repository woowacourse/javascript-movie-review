import { MovieListSkeleton } from "../type/componentType";

class SkeletonStore {
  private subscriber: MovieListSkeleton | undefined;

  subscribe(element: MovieListSkeleton) {
    this.subscriber = element;
  }

  publish() {
    if (this.subscriber) this.subscriber.render();
  }

  removeSkeleton() {
    if (this.subscriber) this.subscriber.removeSkeleton();
  }
}

export default new SkeletonStore();
