export default abstract class Observer<TState> {
  abstract update(state: TState): void;
}
