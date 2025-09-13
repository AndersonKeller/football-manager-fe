import { z } from "zod";

export const createStadiumAreaSchema = z.object({
  name: z
    .string()
    .min(3, "Min length is 3 characters")
    .max(255, "max length is 255 characters"),
});
export const returnStadiumAreaSchema = createStadiumAreaSchema.extend({
  id: z.number(),
  stadium: z
    .object({
      name: z.string(),
      id: z.number(),
    })
    .array()
    .optional(),
});
export const returnAllStadiumAreaSchema = returnStadiumAreaSchema.array();

export type iCreateStadiumArea = z.infer<typeof createStadiumAreaSchema>;
export type iReturnStadiumArea = z.infer<typeof returnStadiumAreaSchema>;
export type iReturnAllStadiumsArea = z.infer<typeof returnAllStadiumAreaSchema>;

export const createStadiumSchema = z.object({
  name: z
    .string()
    .min(3, "Min length is 3 characters")
    .max(255, "max length is 255 characters"),

  stadiumArea: returnStadiumAreaSchema.pick({ id: true }),
});
export const returnStadiumSchema = createStadiumSchema.extend({
  id: z.number(),
  stadiumArea: returnStadiumAreaSchema,
  capacity: z.number(),
  ticket: z.number(),
});

export const returnAllStadiumsSchema = returnStadiumSchema.array();

export type iCreateStadium = z.infer<typeof createStadiumSchema>;
export type iReturnStadium = z.infer<typeof returnStadiumSchema>;
export type iReturnAllStadiums = z.infer<typeof returnAllStadiumsSchema>;
