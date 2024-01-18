type TablePaginationProps = {
  currentPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

function TablePagination({
  currentPage,
  onNextPage,
  onPrevPage,
}: TablePaginationProps) {
  return (
    <div className="flex gap-4">
      <button className="btn" onClick={onPrevPage}>
        Prev
      </button>
      <div className="flex justify-center items-center w-10 h-10">
        {currentPage}
      </div>
      <button className="btn" onClick={onNextPage}>
        Next
      </button>
    </div>
  );
}
export default TablePagination;
