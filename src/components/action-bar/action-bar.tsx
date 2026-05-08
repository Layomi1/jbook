import { type FC } from "react";
import { useActions } from "../../hooks/use-actions";
import ActionButton from "../action-button/action-button";
import "../action-bar/action-bar.css";

interface ActionBarProps {
  id: string;
}
const ActionBar: FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <ActionButton
        onClick={() => moveCell(id, "up")}
        icon={<i className="fas fa-arrow-up"></i>}
      />
      <ActionButton
        onClick={() => moveCell(id, "down")}
        icon={<i className="fas fa-arrow-down"></i>}
      />

      <ActionButton
        onClick={() => deleteCell(id)}
        icon={<i className="fas fa-trash"></i>}
      />
    </div>
  );
};

export default ActionBar;
