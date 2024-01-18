import { useSearchParams } from "react-router-dom";
import DataTable from "../components/data-table";
import { records } from "../mocks/data";

function Table() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <DataTable
      data={records}
      page={Number(searchParams.get("page")) || 0}
      onPageChange={handlePageChange}
    />
  );
}

export default Table;
