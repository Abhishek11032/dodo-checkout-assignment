import { EVENTS } from "../constants/events";

export type EventType =
  (typeof EVENTS)[keyof typeof EVENTS];

export const sendMessageToParent = (
  type: EventType,
  payload?: Record<string, unknown>
) => {
  if (window.parent === window) {
    return;
  }

  window.parent.postMessage(
    {
      type,
      payload,
    },
    "*"
  );
};