"use client";
import React, { useState } from "react";
import { Contact } from "./ContactTable";
import { axiosInstance } from "@/configs/axios";

interface Props {
  contact: Contact;
  name: "firstName" | "lastName" | "email" | "phone" | "gender";
}

export const EditableBlock: React.FC<Props> = ({ contact, name }) => {
  const [value, setValue] = useState(contact[name]);
  const [saving, setSaving] = useState(false);
  async function update() {
    setSaving(true);
    const res = await axiosInstance.patch(`/contacts/${contact.id}`, { [name]: value });
    if (!(res.status === 200)) {
      setValue(contact[name]);
    }
    setSaving(false);
  }
  if (name == "gender") {
    return (
      <div className="relative">
        {saving && <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50"></div>}

        <select
          className="w-full min-w-24 border-0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={update}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
    );
  }
  return (
    <div className="relative">
      {saving && <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50"></div>}
      <input
        className="border-0 p-2 "
        disabled={saving}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={update}
      />
    </div>
  );
};
