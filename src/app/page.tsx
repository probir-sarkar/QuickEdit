import ContactTable from "@/components/ContactTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className=" max-w-7xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center">Instant Table Editor</h1>
      <div className="flex justify-end my-4">
        <Link href="/contact-form" className="flex items-center bg-gray-700 p-2 text-white ">
          <Plus /> <span>Add Contact</span>
        </Link>
      </div>
      <ContactTable />
      <div className="my-8 italic p-4 bg-gray-200 border rounded-lg">
        <p>
          {/* write a description for table like if you click cell of table you can edit it live  */}
          This is a simple table editor that allows you to edit the table cells live. Click on any cell to edit it.
          <br />
          <br />
          You can also add new contacts by clicking the &quot;Add Contact&quot; button above.
          <br />
          <br />
          If you need to delete a contact, you have to check the checkbox in the first column of the table and then
          click the delete button.
        </p>
      </div>
    </div>
  );
}
