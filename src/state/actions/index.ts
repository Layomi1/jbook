import { ActionType } from "../action-types";
import { type CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: typeof ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: typeof ActionType.DELETE_CELL;
  payload: string;
}

export interface UpdateCellAction {
  type: typeof ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface InsertCellBeforeAction {
  type: typeof ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | UpdateCellAction
  | InsertCellBeforeAction;
