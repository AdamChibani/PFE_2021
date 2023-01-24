import { createStore, applyMiddleware } from "redux";
import routeReducer from "./routeReducer";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";

const middleWare = [logger];
export const store = createStore(routeReducer, applyMiddleware(...middleWare));

export const persister = persistStore(store);
