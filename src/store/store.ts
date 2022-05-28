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

const store = createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools({ actionSanitizer, stateSanitizer })(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
