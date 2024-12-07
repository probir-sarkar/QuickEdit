/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { contactFormResolver, ContactFormType } from "@/schemas/contactFormSchema";
import { toast } from "sonner";
import { axiosInstance } from "@/configs/axios";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/Form";
import useSWRImmutable from "swr";
import { useRouter } from "next/navigation";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default function UpdateContactForm({ params }: { params: { formId: string } }) {
  const formId = +params.formId;
  const { data, error, isLoading, isValidating, mutate } = useSWRImmutable(`/${formId}`, fetcher, {
    revalidateOnMount: true,
  });
  const router = useRouter();

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
    console.log(data);

    toast.loading("Updating...");
    try {
      const response = await axiosInstance.put(`/${formId}`, data);
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Successfully Updated");
        mutate();
        return router.push("/");
      }
      throw new Error("Failed to update");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update");
    }
  };
  useEffect(() => {
    if (data?.contact) {
      reset(data.contact);
    }
  }, [isLoading, isValidating]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || !data.contact) return <div>Failed to load</div>;

  return (
    <>
      <Link href="/" className="flex items-center  mt-10 gap-2 max-w-3xl mx-auto">
        <MoveLeft />
        Back to All Contacts
      </Link>
      <div className="max-w-3xl mx-auto p-5 rounded-xl shadow-md border border-gray-100 my-4 ">
        <h1 className="text-2xl font-bold text-center mb-8">Update Contact Form</h1>
        <ContactForm {...{ register, handleSubmit, onSubmit, errors, isSubmitting }} />
      </div>
    </>
  );
}
