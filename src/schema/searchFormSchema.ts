import { z } from "zod";

export const searchFormSchema = z.object({
  hotelName: z.string().min(1, { message: "Please fill this field." }),
  checkin: z.string().min(1, { message: "Please fill this field." }),
  checkout: z.string().min(1, { message: "Please fill this field." }),
  rooms: z.number(),
  adults: z.number(),
  childrens: z.number(),
  cur: z.string().min(1, { message: "Please fill this field." }),
  tax: z.boolean(),
});

export type SearchFormInputs = z.infer<typeof searchFormSchema>;
