import type { Keys } from "laser-utils";
import { EventBus as AbstractEventBus } from "laser-utils";

const EVENTS_TYPE = ["ON_LOADED", "PLACEHOLDER"] as const;

export const EVENTS_ENUM = EVENTS_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in (typeof EVENTS_TYPE)[number]]: `__${K}__` }
);

interface EventBusParams {
  [EVENTS_ENUM.ON_LOADED]: null;
}

declare module "laser-utils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface EventBusType extends EventBusParams {}
}

class EventBus extends AbstractEventBus {
  public commit<T extends Keys>(key: T, value: EventBusParams[T]) {
    console.log("Event Commit:", key);
    this.emit(key, value);
  }
}

export const Event = new EventBus();
