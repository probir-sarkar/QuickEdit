"use client";
import React from "react";
import { SubmitHandler, UseFormRegister, UseFormHandleSubmit, FieldErrors } from "react-hook-form";
import { ContactFormType } from "@/schemas/contactFormSchema";
interface Props {
  register: UseFormRegister<ContactFormType>;
  handleSubmit: UseFormHandleSubmit<ContactFormType>;
  onSubmit: SubmitHandler<ContactFormType>;
  errors: FieldErrors<ContactFormType>;
  isSubmitting: boolean;
}

const ContactForm: React.FC<Props> = ({ register, handleSubmit, onSubmit, errors, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <h3 className="underline text-lg font-bold mb-4">Personal Information</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName">First Name*</label>
          <input className="w-full" id="firstName" type="text" {...register("firstName")} />
          {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message}</span>}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName">Last Name*</label>
          <input className="w-full" id="firstName" type="text" {...register("lastName")} />
          {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message}</span>}
        </div>

        <div className="space-y-2 md:col-span-2 ">
          <label htmlFor="email">Email</label>
          <input className="w-full" id="email" type="email" {...register("email")} />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone">Phone</label>
          <input className="w-full" id="phone" type="text" {...register("phone")} />
          {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
        </div>
        <div className="space-y-2">
          <label htmlFor="gender">Gender</label>
          <select className="w-full" {...register("gender")}>
            <option value="undefined" disabled selected hidden>
              Select Gender
            </option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <span className="text-sm text-red-500">{errors.gender.message} </span>}
        </div>
      </div>
      <h3 className="underline text-lg font-bold mb-4 mt-8">Address Information</h3>
      <div className="grid gap-4">
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="address">Address</label>
          <input className="w-full" id="address" type="text" {...register("address.line1")} />
          {errors.address?.line1 && <span className="text-sm text-red-500">{errors.address.line1.message}</span>}
        </div>
        <div className="space-y-2">
          <label htmlFor="city">City</label>
          <input className="w-full" id="city" type="text" {...register("address.city")} />
          {errors.address?.city && <span className="text-sm text-red-500">{errors.address.city.message}</span>}
        </div>
        <div className="space-y-2">
          <label htmlFor="state">State</label>
          <input className="w-full" id="state" type="text" {...register("address.state")} />
          {errors.address?.state && <span className="text-sm text-red-500">{errors.address.state.message}</span>}
        </div>
        <div className="space-y-2">
          <label htmlFor="country">Country</label>
          <input className="w-full" id="country" type="text" {...register("address.country")} />
          {errors.address?.country && <span className="text-sm text-red-500">{errors.address.country.message}</span>}
        </div>
        <div className="space-y-2">
          <label htmlFor="zipCode">Zip Code</label>
          <input className="w-full" id="zipCode" type="text" {...register("address.zipCode")} />
          {errors.address?.zipCode && <span className="text-sm text-red-500">{errors.address.zipCode.message}</span>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 tracking-wider bg-gray-800 w-full text-white p-2  enabled:hover:bg-black transition-all duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
