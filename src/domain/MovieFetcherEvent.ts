type Listener = () => void;

class MovieFetcherEvent {
  private listeners: Listener[] = [];

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  public notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const movieFetcherEvent = new MovieFetcherEvent();
