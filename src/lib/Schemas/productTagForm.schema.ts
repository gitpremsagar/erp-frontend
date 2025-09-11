import { z } from "zod";

export const CreateProductTagSchema = z.object({
  name: z
    .string()
    .min(1, "Product tag name is required")
    .max(50, "Product tag name must be at most 50 characters long")
    .trim(),
});

export const UpdateProductTagSchema = z.object({
  name: z
    .string()
    .min(1, "Product tag name is required")
    .max(50, "Product tag name must be at most 50 characters long")
    .trim()
    .optional(),
});

export const ProductTagQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  search: z.string().trim().optional(),
});
