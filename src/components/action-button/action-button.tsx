import React, { type FC } from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}
const ActionButton: FC<ActionButtonProps> = ({ onClick, icon }) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">{icon}</span>
    </button>
  );
};

export default ActionButton;
