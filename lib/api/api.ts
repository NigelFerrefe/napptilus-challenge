import axios from "axios";
import { ZodType } from "zod";
import { PhoneSchema, PhoneDetailSchema, ErrorSchema } from "./types";
import type { Phone, PhoneDetail } from "./types";
import { DEFAULT_PAGE_LIMIT, DEFAULT_PAGE_OFFSET } from "../constants";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY!;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "x-api-key": API_KEY,
  },
});

async function validationFetch<T>(
  promise: Promise<unknown>,
  schema: ZodType<T>,
): Promise<T> {
  try {
    const { data } = (await promise) as { data: unknown };
    return schema.parse(data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      throw ErrorSchema.parse(error.response.data);
    }
    throw error;
  }
}

export const getPhones = async (
  search?: string,
  limit = DEFAULT_PAGE_LIMIT,
  offset = DEFAULT_PAGE_OFFSET,
): Promise<Phone[]> => {
  const params: Record<string, string | number> = { limit, offset };
  if (search) params.search = search;

  const phones = await validationFetch(
    api.get("/products", { params }),
    PhoneSchema.array(),
  );

  const seen = new Set<string>();
  return phones.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
};

export const getPhoneById = async (id: string): Promise<PhoneDetail> => {
  return validationFetch(api.get(`/products/${id}`), PhoneDetailSchema);
};
