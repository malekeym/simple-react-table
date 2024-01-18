import { useSearchParams } from "react-router-dom";
import DataTable from "../components/data-table";
import { records } from "../mocks/data";
import { useState } from "react";

const SEARCH_KEYS: Array<keyof (typeof records)[0]> = [
  "name",
  "phone",
  "address",
];
function Table() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(records);

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("filter", e.target.value);

    setSearchParams(searchParams);

    setData(
      records.filter((record) =>
        SEARCH_KEYS.some((key) =>
          record[key].toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
    );
  };

  const handleSortChange = (key: keyof (typeof records)[0]) => {
    const sortKey = searchParams.get("sort");
    if (sortKey === key) {
      searchParams.set("sort", `-${key}`);
    } else if (sortKey === `-${key}`) {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", key);
    }
    setSearchParams(searchParams);

    setData(
      records.sort((a, b) => {
        if (sortKey === key) {
          return a[key].localeCompare(b[key]);
        } else if (sortKey === `-${key}`) {
          return b[key].localeCompare(a[key]);
        } else {
          return 0;
        }
      })
    );
  };

  return (
    <>
      <input
        className="w-full p-2 border border-gray-300 rounded-md"
        onChange={handleFilterChange}
        value={searchParams.get("filter") || ""}
      />
      <DataTable
        data={data}
        page={Number(searchParams.get("page")) || 1}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
      />
    </>
  );
}

export default Table;
