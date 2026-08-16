import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});
