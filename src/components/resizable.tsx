import type { FC } from "react";
import { ResizableBox } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "vertical" | "horizontal";
  children: React.ReactNode;
}
const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      width={Infinity}
      height={200}
      // draggableOpts={{ grid: [25, 25] }}
      minConstraints={[Infinity, 24]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      resizeHandles={["s"]}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
