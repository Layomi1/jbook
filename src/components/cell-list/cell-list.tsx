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
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <article>
      <>
        {renderedCells}

        <AddCell nextCellId={null} forceVisible={cells.length === 0} />
      </>
    </article>
  );
};

export default CellList;
