import { MovieResponse } from "../../types/types";

export type AppEventPayloads = {
  loadStart: void;
  moviesLoaded: MovieResponse;
  searchLoaded: MovieResponse;
  moreLoaded: MovieResponse;
};

type Handler<T> = (payload: T) => void;

class EventBus {
  private listeners = new Map<string, Handler<unknown>[]>();

  subscribe<K extends keyof AppEventPayloads>(
    event: K,
    handler: Handler<AppEventPayloads[K]>,
  ): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler as Handler<unknown>);
  }

  publish<K extends keyof AppEventPayloads>(
    event: K,
    payload: AppEventPayloads[K],
  ): void {
    this.listeners.get(event)?.forEach((handler) => handler(payload));
  }
}

export const eventBus = new EventBus();

export const APP_EVENTS = {
  LOAD_START: "loadStart",
  MOVIES_LOADED: "moviesLoaded",
  SEARCH_LOADED: "searchLoaded",
  MORE_LOADED: "moreLoaded",
} as const satisfies Record<string, keyof AppEventPayloads>;
