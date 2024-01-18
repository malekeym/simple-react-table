import { useSearchParams } from "react-router-dom";
import DataTable from "../components/data-table";
import { records } from "../mocks/data";
import { useMemo } from "react";

type Key = keyof (typeof records)[0];
type SortKey = `-${Key}` | Key | "";

const SEARCH_KEYS: Array<Key> = ["name", "phone", "address"];

const applyFilter = (data: typeof records, filter: string) => {
  return data.filter((record) =>
    SEARCH_KEYS.some((key) =>
      record[key].toLowerCase().includes(filter.toLowerCase())
    )
  );
};

const applySort = (data: typeof records, sort: SortKey | null) => {
  if (!sort) {
    return data;
  }
  return data.sort((a, b) => {
    const key = sort.replace("-", "") as Key;
    if (sort.startsWith("-")) {
      return b[key].localeCompare(a[key]);
    } else {
      return a[key].localeCompare(b[key]);
    }
  });
};

function Table() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const sort = searchParams.get("sort") as SortKey | null;

  const data = useMemo(() => {
    return applySort(applyFilter(records, filter), sort);
  }, [filter, sort]);

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("filter", e.target.value);

    setSearchParams(searchParams);
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
  };

  return (
    <div className="max-w-4xl m-auto">
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
    </div>
  );
}

export default Table;
