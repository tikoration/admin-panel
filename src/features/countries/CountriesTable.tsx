import useGetCountries, { type ICountriesResponse } from "./useGetCountries";
import DataTable from "../../components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const CountriesTable = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("perPage") || "15", 10);
  const currency = searchParams.get("currency") || "";
  const independent = searchParams.get("independent") || "";

  const params = {
    currency: currency,
  };

  const { data, isPending } = useGetCountries(params);

  const filteredData = useMemo(() => {
    if (!data) return [];

    const filtered = data.filter((country) => {
      if (independent) return country.independent === true;
      return true;
    });
    return filtered;
  }, [data, independent]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return filteredData.slice(start, end);
  }, [filteredData, page, perPage]);

  const columns = useMemo<ColumnDef<ICountriesResponse>[]>(
    () => [
      {
        accessorKey: "region",
        header: "Region",
      },
      { accessorKey: "name.common", header: "Country" },
      {
        accessorKey: "capital",
        header: "Capital",
      },
      {
        accessorKey: "currencies",
        header: "Currency",
        cell: ({ row }) => {
          const currencies = row.original.currencies;

          if (!currencies) return "—";

          const currencyCodes = Object.keys(currencies).join(", ");

          return <>{currencyCodes}</>;
        },
      },
      {
        accessorKey: "language",
        header: "Language",
        cell: ({ row }) => {
          const languages = row.original.languages;

          if (!languages) return "—";

          const languageNames = Object.values(languages).join(", ");

          return <>{languageNames}</>;
        },
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={paginatedData || []}
      pending={isPending}
      totalElements={filteredData?.length || 0}
    />
  );
};

export default CountriesTable;
