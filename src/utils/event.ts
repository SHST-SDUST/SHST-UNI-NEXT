import { EventBus as AbstractEventBus } from "laser-utils";

const EVENTS_TYPE = ["ON_LAUNCH", "PLACEHOLDER"] as const;

export const EVENTS_ENUM = EVENTS_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in (typeof EVENTS_TYPE)[number]]: `__${K}__` }
);

interface EventBusParams {
  [EVENTS_ENUM.ON_LAUNCH]: null;
}

declare module "laser-utils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface EventBusType extends EventBusParams {}
}

export const Event = new AbstractEventBus();
