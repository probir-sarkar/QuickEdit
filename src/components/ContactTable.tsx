"use client";
import React, { useState } from "react";
import useSWR, { Fetcher } from "swr";
import Pagination from "./Pagination";
import TableRow from "./TableRow";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "MALE" | "FEMLAE" | "OTHER";
}

const fetcher: Fetcher<Contact[], string> = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then((res) => res.json());

const ContactTable = () => {
  const { data, error, isLoading } = useSWR("/contacts", fetcher);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.length < 1) return <div>Failed to load</div>;

  const filteredData = data.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <>
      <table className="table-auto w-full border-collapse  border">
        <thead>
          <tr className="bg-gray-200">
            <th></th>
            <th className="p-2 text-start">First Name</th>
            <th className="p-2 text-start">Last Name</th>
            <th className="p-2 text-start">Email</th>
            <th className="p-2 text-start">Phone</th>
            <th className="p-2 text-start ">Gender</th>
            <th className="p-2 text-start ">Edit</th>
            <th className="p-2 text-start ">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((contact, index) => (
            <TableRow key={contact.id} contact={contact} />
          ))}
        </tbody>
      </table>
      <Pagination totalItems={data.length} {...{ currentPage, setCurrentPage, perPage }} />
    </>
  );
};

export default ContactTable;
