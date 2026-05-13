import type { FC } from "react";
import { useActions } from "../../hooks/use-actions";
import "../add-cell/add-cell.css";

interface AddCellProps {
  prevCellId: string | null;
  forceVisible?: boolean;
}
const AddCell: FC<AddCellProps> = ({ prevCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-btns">
        <button
          className="button is-small is-primary is-rounded"
          onClick={() => insertCellAfter(prevCellId, "code")}
        >
          Code
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
        </button>

        <button
          className="button is-small is-primary is-rounded"
          onClick={() => insertCellAfter(prevCellId, "text")}
        >
          Text
          <span className="icon is-small">
            <i className="fas fa-plus"></i>
          </span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
