import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Contact } from "@/components/ContactTable";
import { EditableBlock } from "./EditableBlock";

interface Props {
  contact: Contact;
}

const TableRow: React.FC<Props> = ({ contact }) => {
  const [checked, setChecked] = useState(false);
  async function handleDelete() {
    try {
      if (!checked) return;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${contact.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <tr key={contact.id} className="border-b">
      <td className="p-2">
        <input type="checkbox" checked={checked} onChange={() => setChecked((prev) => !prev)} />
      </td>
      <td className="">
        <EditableBlock name="firstName" contact={contact} />
      </td>
      <td className="">
        <EditableBlock name="lastName" contact={contact} />
      </td>
      <td className="">
        <EditableBlock name="email" contact={contact} />
      </td>
      <td className="">
        <EditableBlock name="phone" contact={contact} />
      </td>
      <td className="">
        <EditableBlock name="gender" contact={contact} />
      </td>
      <td className="">
        <div className={`flex justify-center items-center `}>
          <Trash2
            onClick={handleDelete}
            className={`${checked ? "text-red-500 cursor-pointer" : "text-red-200 cursor-not-allowed"} `}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
