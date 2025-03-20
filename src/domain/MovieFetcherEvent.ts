type Listener = () => void;

class MovieFetcherEvent {
  private listeners: Listener[] = [];

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => this.unsubscribe(listener);
  }

  public unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const movieFetcherEvent = new MovieFetcherEvent();
