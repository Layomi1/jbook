import { ActionType } from "../action-types";
import { type Cell } from "../cell";
import { type Action } from "../actions";
import { produce } from "immer";

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: Array<string>;
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        {
          const { id, content } = action.payload;
          state.data[id].content = content;
        }
        return;
      case ActionType.DELETE_CELL:
        return state;
        return;
      case ActionType.MOVE_CELL:
        return state;
        return;
      case ActionType.INSERT_CELL_BEFORE:
        return state;
        return;
      default: {
        return state;
      }
    }
  },
);
export default cellReducer;
