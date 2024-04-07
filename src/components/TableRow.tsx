import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Contact } from "@/components/ContactTable";
import { EditableBlock } from "./EditableBlock";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { axiosInstance } from "@/configs/axios";
import Link from "next/link";

interface Props {
  contact: Contact;
}

const TableRow: React.FC<Props> = ({ contact }) => {
  const [checked, setChecked] = useState(false);
  const { mutate } = useSWRConfig();
  async function handleDelete() {
    toast.loading("Deleting...", {
      id: contact.id,
    });
    try {
      if (!checked) return;
      const res = await axiosInstance.delete(`/contacts/${contact.id}`);
      if (res.status === 200) {
        mutate("/contacts");
        toast.dismiss(contact.id);
        toast.success("Deleted");
      }
    } catch (error) {
      toast.dismiss(contact.id);
      toast.error("Failed to delete");
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
        <Link className="flex justify-center items-center " href={`/update-form/${contact.id}`}>
          <Pencil size={16} className="text-blue-600" />
        </Link>
      </td>
      <td className="">
        <div className={`flex justify-center items-center `}>
          <Trash2
            size={16}
            onClick={handleDelete}
            className={`${checked ? "text-red-500 cursor-pointer" : "text-red-200 cursor-not-allowed"} `}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
