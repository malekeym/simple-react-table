import { DataTableProps } from "./data-table";

type TableHeadProps<T extends Record<string, string> & { id: string }> = {
  columnDef: Array<keyof T>;
  onColumnClick: DataTableProps<T>["onSortChange"];
};
function TableHead<T extends Record<string, string> & { id: string }>({
  columnDef,
  onColumnClick,
}: TableHeadProps<T>) {
  return (
    <tr>
      {columnDef.map((item) => (
        <th onClick={() => onColumnClick(item)} key={item.toString()}>
          {item.toString()}
        </th>
      ))}
    </tr>
  );
}
export default TableHead;
