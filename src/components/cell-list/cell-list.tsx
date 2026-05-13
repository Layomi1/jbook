import { Fragment } from "react/jsx-runtime";
import { useTypedSelector } from "../../hooks/use-typed-selector";
import AddCell from "../add-cell/add-cell";
import CellListItem from "../cell-list-item/cell-list-item";
import "../add-cell/add-cell.css";

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id]),
  );

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <article>
      <>
        <AddCell prevCellId={null} forceVisible={cells.length === 0} />
        {renderedCells}
      </>
    </article>
  );
};

export default CellList;
