import { z } from "zod";

import { returnPositionCategorySchema } from "./position-category.schemas";
import { language } from "../plugins/language";

export const createPositionSchema = z.object({
  name: z
    .string()
    .min(1, language.translate("MIN_CHAR"))
    .max(255, language.translate("MAX_CHAR")),
  description: z
    .string()
    .min(3, language.translate("MIN_CHAR"))
    .max(255, language.translate("MAX_CHAR")),
  short: z
    .string()
    .min(1, language.translate("MIN_CHAR"))
    .max(45, language.translate("MAX_CHAR")),
  positionCategory: returnPositionCategorySchema.pick({ id: true }),
});
export const returnPositionSchema = createPositionSchema.extend({
  id: z.number(),
  positionCategory: returnPositionCategorySchema,
});
export const returnAllPositionSchema = returnPositionSchema.array();

export type iCreatePosition = z.infer<typeof createPositionSchema>;
export type iReturnPosition = z.infer<typeof returnPositionSchema>;
export type iReturnAllPosition = z.infer<typeof returnAllPositionSchema>;
