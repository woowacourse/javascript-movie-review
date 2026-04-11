import { registerSubscriptions } from "./subscriptions";
import { setupRoutes, bindDomEvents } from "./router";

registerSubscriptions();
setupRoutes();
bindDomEvents();
