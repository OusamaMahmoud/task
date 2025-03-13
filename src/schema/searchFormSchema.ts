import { z } from "zod";

export const searchFormSchema = z.object({
  hotelName: z.string().min(1, { message: "Please fill this field." }),
});

export type SearchFormInputs = z.infer<typeof searchFormSchema>;
