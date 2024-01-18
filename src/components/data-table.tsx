import TableHead from "./table-head";
import TablePagination from "./table-pagingation";
import TableRow from "./table-row";

type DataTableProps = {
  data: Array<Record<string, string> & { id: string | number }>;
  pageSize?: number;
  page: number;
  onPageChange: (page: number) => void;
};

function DataTable({
  data,
  pageSize = 10,
  page,
  onPageChange,
}: DataTableProps) {
  const onNextPage = () => {
    onPageChange(page < data.length - 1 ? page + 1 : page);
  };
  const onPrevPage = () => {
    onPageChange(page > 1 ? page - 1 : page);
  };
  return (
    <div className="flex flex-col gap-4">
      <table>
        <thead>
          <TableHead columnDef={Object.keys(data[0])} />
        </thead>
        <tbody>
          {data.slice((page - 1) * pageSize, page * pageSize).map((item) => (
            <TableRow key={item.id} rowData={item} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end">
        <TablePagination
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
          currentPage={page}
        />
      </div>
    </div>
  );
}
export default DataTable;
