import { z } from "zod";

export const submissionSchema = z.object({
  phone_number: z.string().min(10, "Phone number must be at least 10 characters").regex(/^[+\d\s]+$/, "Please enter a valid phone number"),
  name: z.string().min(2, "Please enter your full name").regex(/^[a-zA-Z\s]*$/, "Name should only contain letters"),
  details: z.string().min(1, "Please select details"),
  weight: z.coerce.number().int().positive("Please enter weight (whole numbers only)"),
  type: z.string().min(1, "Please select type"),
  depot: z.string().min(1, "Please select depot"),
});

export type SubmissionSchema = z.infer<typeof submissionSchema>;
