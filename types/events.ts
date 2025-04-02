export type LoadingEventType = "loading:start" | "loading:end";

export const LOADING_EVENTS = {
  START: "loading:start",
  END: "loading:end",
} as const;

export const dispatchLoadingEvent = (type: LoadingEventType) => {
  document.dispatchEvent(new Event(type));
};
