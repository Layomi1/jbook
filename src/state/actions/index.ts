import { ActionType } from "../action-types";
import { type CellTypes } from "../cell";

interface MoveCelLAction {
  type: typeof ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface DeleteCelLAction {
  type: typeof ActionType.DELETE_CELL;
  payload: {
    id: string;
  };
}

interface UpdateCelLAction {
  type: typeof ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

interface InsertCelLBeforeAction {
  type: typeof ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

export type Action =
  | MoveCelLAction
  | DeleteCelLAction
  | UpdateCelLAction
  | InsertCelLBeforeAction;
