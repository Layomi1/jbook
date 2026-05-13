import { ActionType } from "../action-types";
import type {
  DeleteCellAction,
  UpdateCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
} from "../actions";

import type { CellType } from "../cell";

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: { id, direction },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellType,
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const actionCreators = {
  deleteCell,
  updateCell,
  moveCell,
  insertCellAfter,
};
