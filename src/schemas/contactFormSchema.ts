import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const contactFormSchema = z.object({
  firstName: z.string().min(3).max(14),
  lastName: z.string().min(3).max(14),
  email: z.string().email(),
  phone: z.string().min(6).max(18),
  gender: z.enum(["MALE", "FEMALE", "OTHER"],{
    errorMap: (issue, ctx) => ({ message: 'Please Select Gender' })
  }),
  other: z.object({}).optional(),
  address: z.object({
    line1: z.string().min(1).max(255),
    line2: z.string().max(255).optional(),
    city: z.string().min(1).max(255),
    state: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
    zipCode: z.string().min(1).max(255),
  }),
});

// type of schema
export type ContactForm = z.infer<typeof contactFormSchema>;

export const contactFormResolver = zodResolver(contactFormSchema);

// create blank object for form
export const blankForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  address: {
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
};
