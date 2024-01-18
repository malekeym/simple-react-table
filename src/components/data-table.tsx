import TableHead from "./table-head";
import TablePagination from "./table-pagingation";
import TableRow from "./table-row";

export type DataTableProps<
  T extends Record<string, string> & { id: string } = { id: string }
> = {
  data: T[];
  pageSize?: number;
  page: number;
  onPageChange: (page: number) => void;
  onSortChange: (key: keyof T) => void;
};

function DataTable<
  T extends Record<string, string> & { id: string } = { id: string }
>({
  data,
  pageSize = 10,
  page,
  onPageChange,
  onSortChange,
}: DataTableProps<T>) {
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
          <TableHead
            columnDef={Object.keys(data[0]) as Array<keyof (typeof data)[0]>}
            onColumnClick={onSortChange}
          />
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
