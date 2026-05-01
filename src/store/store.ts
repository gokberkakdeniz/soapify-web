import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./reducer";
import rootSaga from "./saga";
import preloadedState from "./state";

const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const actionSanitizer = (action: any): any =>
  action.type === "tracks/cached" || action.type === "tracks/success"
    ? {
        ...action,
        payload: {
          ...action.payload,
          tracks: "<<<TracksObject>>>",
        },
      }
    : action;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stateSanitizer = (state: any): any => ({
  ...state,
  playlist: "<<<PlaylistState>>>",
  tracks: {
    ...state.tracks,
    data: "<<<TracksData>>>",
  },
});

// Type mismatch between @redux-devtools/extension v4 and redux v5; cast is safe.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const enhancer: any = composeWithDevTools({ actionSanitizer, stateSanitizer })(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyMiddleware(sagaMiddleware) as any,
);

const store = createStore(rootReducer, preloadedState, enhancer);

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export default store;
