import { useTypedSelector } from "../../hooks/use-typed-selector";
import CellListItem from "../cell-list-item/cell-list-item";

const CellList = () => {
  //   const dispatch = useDispatch();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id]),
  );

  return (
    <article>
      {cells.map((cell) => (
        <CellListItem key={cell.id} cell={cell} />
      ))}
    </article>
  );
};

export default CellList;
