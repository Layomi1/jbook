import { useEffect, useState, type FC } from "react";
import { ResizableBox, type ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "vertical" | "horizontal";
  children: React.ReactNode;
}
const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);

  let resizableProps: ResizableBoxProps;

  useEffect(() => {
    let timer: number;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width,
      height: Infinity,

      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
      onResizeStop: (_event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
