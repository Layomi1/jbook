import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { ActionType } from "./action-types";

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export default store;

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});
