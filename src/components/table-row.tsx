type TableRowProps = {
  rowData: Record<string, string>;
};
function TableRow({ rowData }: TableRowProps) {
  return (
    <tr>
      {Object.keys(rowData).map((key) => (
        <td key={`${key}-${rowData.id}`}>{rowData[key]}</td>
      ))}
    </tr>
  );
}
export default TableRow;
