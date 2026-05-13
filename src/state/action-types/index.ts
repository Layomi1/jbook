export const ActionType = {
  MOVE_CELL: "move_cell",
  DELETE_CELL: "delete_cell",
  UPDATE_CELL: "update_cell",

  INSERT_CELL_AFTER: "insert_cell_after",
} as const;

export type ActionType = (typeof ActionType)[keyof typeof ActionType];
