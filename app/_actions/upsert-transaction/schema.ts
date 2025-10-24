import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import z from "zod";

export const upsertTransactionSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.enum(TransactionType),
  category: z.enum(TransactionCategory),
  paymentMethod: z.enum(TransactionPaymentMethod),
  date: z.date(),
});
