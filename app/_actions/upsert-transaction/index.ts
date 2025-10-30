"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionStatusDelete,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

// interface deleteTransactionParams {
//   id: string
// }

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const baseData = { ...params, userId };
  if (params.id) {
    try {
      await db.transaction.upsert({
        where: {
          id: params.id ?? "",
        },
        update: baseData,
        create: baseData,
      });
    } catch (error) {
      console.error("Erro ao executar upsert:", error);
      throw new Error("Falha ao atualizar ou criar a transação");
    }
  } else {
    try {
      await db.transaction.create({
        data: baseData,
      });
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      throw new Error("Falha ao criar nova transação");
    }
  }
  revalidatePath("/transactions");
};

export const deleteTransaction = async (id: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.updateMany({
    where: { id },
    data: { statusDelete: TransactionStatusDelete.DISABLED },
  });

  revalidatePath("/transactions");
};
