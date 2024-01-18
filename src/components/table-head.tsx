type TableHeadProps = {
  columnDef: Array<string>;
};
function TableHead({ columnDef }: TableHeadProps) {
  return (
    <tr>
      {columnDef.map((item) => (
        <th key={item}>{item}</th>
      ))}
    </tr>
  );
}
export default TableHead;
