import { z } from "zod";

export const submissionSchema = z.object({
  phone_number: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  name: z.string().min(2, "Please enter your full name").regex(/^[a-zA-Z\s]*$/, "Name should only contain letters"),
  details: z.string().min(1, "Please select details"),
  weight: z.coerce.number().int().positive("Please enter weight (whole numbers only)"),
  type: z.string().min(1, "Please select type"),
  depot: z.string().min(1, "Please select depot"),
});

export type SubmissionSchema = z.infer<typeof submissionSchema>;
