import { ActionType } from "../action-types";
import { type Cell } from "../cell";
import { type Action } from "../actions";

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

const cellReducer = (
  state: CellsState = initialState,
  action: Action,
): CellsState => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.UPDATE_CELL:
      return state;
    default: {
      return state;
    }
  }
};
export default cellReducer;
