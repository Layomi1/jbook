import { type FunctionComponent } from "react";
import type { Cell } from "../../state/cell";

import TextEditor from "../text-editor/text-editor";
import CodeCell from "../code-cell";
import { useActions } from "../../hooks/use-actions";

interface CellListItemProps {
  cell: Cell;
}
const CellListItem: FunctionComponent<CellListItemProps> = ({ cell }) => {
  const {} = useActions();
  return <div>{cell.type === "code" ? <CodeCell /> : <TextEditor />}</div>;
};

export default CellListItem;
