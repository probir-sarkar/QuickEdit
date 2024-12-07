"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { contactFormResolver, ContactFormType } from "@/schemas/contactFormSchema";
import { toast } from "sonner";
import { axiosInstance } from "@/configs/axios";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/Form";

export default function AddContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormType>({
    resolver: contactFormResolver,
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<ContactFormType> = async (data) => {
    toast.loading("Submitting...");
    try {
      const response = await axiosInstance.post("/", data);
      toast.dismiss();
      if (response.data?.success) {
        toast.success(response.data?.message);
        reset();
        return;
      }
      toast.error(response.data?.message);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit");
    }
  };

  return (
    <>
      <Link href="/" className="flex items-center  mt-10 gap-2 max-w-3xl mx-auto">
        <MoveLeft />
        Back to All Contacts
      </Link>
      <div className="max-w-3xl mx-auto p-5 rounded-xl shadow-md border border-gray-100 my-4 ">
        <h1 className="text-2xl font-bold text-center mb-8">Contact Form</h1>
        <ContactForm {...{ register, handleSubmit, onSubmit, errors, isSubmitting }} />
      </div>
    </>
  );
}
