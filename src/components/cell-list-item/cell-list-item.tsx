import { type FunctionComponent } from "react";
import type { Cell } from "../../state/cell";

import TextEditor from "../text-editor/text-editor";
import CodeCell from "../code-cell";
import ActionBar from "../action-bar/action-bar";
import "../cell-list-item/cell-list-item.css";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FunctionComponent<CellListItemProps> = ({ cell }) => {
  return (
    <article className="cell-list-item">
      <div>
        {cell.type === "code" ? (
          <>
            <div className="action-bar-wrapper">
              <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell} />
          </>
        ) : (
          <>
            <TextEditor cell={cell} />
            <ActionBar id={cell.id} />
          </>
        )}
      </div>
    </article>
  );
};

export default CellListItem;
