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

const cellReducer = (
  state: CellsState = initialState,
  action: Action,
): CellsState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL: {
        const { id, content } = action.payload;
        draft.data[id].content = content;
        break;
      }

      case ActionType.DELETE_CELL:
        delete draft.data[action.payload];
        draft.order = draft.order.filter((id) => id !== action.payload);
        break;

      case ActionType.MOVE_CELL: {
        const { direction } = action.payload;
        const index = draft.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > draft.order.length) return draft;

        draft.order[index] = draft.order[targetIndex];
        draft.order[targetIndex] = action.payload.id;
        break;
      }

      case ActionType.INSERT_CELL_BEFORE: {
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: "",
        };
        draft.data[cell.id] = cell;

        const foundIndex = draft.order.findIndex(
          (id) => id === action.payload.id,
        );

        if (foundIndex < 0) {
          draft.order.push(cell.id);
        } else {
          draft.order.splice(foundIndex, 0, cell.id);
        }
        break;
      }

      default: {
        return state;
      }
    }
  });
};

export default cellReducer;

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};
