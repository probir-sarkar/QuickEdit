"use client";
import React, { useState, useMemo } from "react";
import useSWR, { Fetcher } from "swr";
import Pagination from "./Pagination";
import TableRow from "./TableRow";
import useSWRImmutable from "swr/immutable";
import { columns } from "@/components/ContactTable/contactTableData";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMLAE" | "OTHER";
}
interface SortBy {
  column: keyof Contact;
  order: "asc" | "desc";
}

const fetcher: Fetcher<Contact[], string> = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then((res) => res.json());

const ContactTable = () => {
  const { data, error, isLoading } = useSWRImmutable("/", fetcher, {
    revalidateOnMount: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<SortBy>({
    column: "firstName",
    order: "asc",
  });

  const sortedItems = React.useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      return (
        a[sortBy.column].toString().localeCompare(b[sortBy.column].toString(), "en", {
          numeric: true,
        }) * (sortBy.order === "asc" ? 1 : -1)
      );
    });
  }, [sortBy, data]);

  const filteredData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return sortedItems.slice(start, end);
  }, [sortedItems, currentPage, perPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.length < 1) return <div>Failed to load</div>;

  function handleSort(column: keyof Contact) {
    if (sortBy.column === column) {
      setSortBy((prev) => ({ ...prev, order: prev.order === "asc" ? "desc" : "asc" }));
    } else {
      setSortBy({ column, order: "asc" });
    }
  }

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <table className="table-auto w-full border-collapse  border ">
          <thead>
            <tr className="bg-gray-200">
              <th></th>
              {columns.map((column) => (
                <th key={column.key} className="p-2 text-start">
                  {column.sortable ? (
                    <button className="flex gap-1" onClick={() => handleSort(column.key as keyof Contact)}>
                      {column.title}
                      {sortBy.column === column.key ? (sortBy.order === "asc" ? "⬆" : "⬇") : ""}
                    </button>
                  ) : (
                    <p>{column.title}</p>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((contact, index) => (
              <TableRow key={contact.id} contact={contact} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalItems={data.length} {...{ currentPage, setCurrentPage, perPage }} />
    </>
  );
};

export default ContactTable;
