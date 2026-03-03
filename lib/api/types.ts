import { z } from "zod";

export const ErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export const PhoneSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  basePrice: z.number(),
  imageUrl: z.url(),
});

const SpecsSchema = z.object({
  screen: z.string(),
  resolution: z.string(),
  processor: z.string(),
  mainCamera: z.string(),
  selfieCamera: z.string(),
  battery: z.string(),
  os: z.string(),
  screenRefreshRate: z.string(),
});

const ColorOptionsSchema = z.object({
  name: z.string(),
  hexCode: z.string(),
  imageUrl: z.url(),
});

const StorageOptionsSchema = z.object({
  capacity: z.string(),
  price: z.number(),
});

const SimilarProductsSchema = z.array(PhoneSchema);

export const PhoneDetailSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  description: z.string(),
  basePrice: z.number(),
  rating: z.number().min(0).max(5),
  specs: SpecsSchema,
  colorOptions: z.array(ColorOptionsSchema),
  storageOptions: z.array(StorageOptionsSchema),
  similarProducts: SimilarProductsSchema,
});

export type ApiError = z.infer<typeof ErrorSchema>;
export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneDetail = z.infer<typeof PhoneDetailSchema>;


