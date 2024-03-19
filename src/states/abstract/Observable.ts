import Observer from "../../components/abstract/Observer";

export default abstract class Observable {
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers = [...this.observers, observer];
  }

  public notify(): void {
    this.observers.forEach((observer) => observer.update());
  }
}
