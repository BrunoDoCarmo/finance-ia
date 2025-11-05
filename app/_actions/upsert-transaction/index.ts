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

  function toUpperCaseData<T extends Record<string, unknown>>(data: T): T {
    const ignoreFields = ["id", "userId"];
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === "string" && !ignoreFields.includes(key)
          ? value.toUpperCase()
          : value,
      ]),
    ) as T;
  }

  const baseDataUpper = toUpperCaseData(baseData);
  // if (params.id) {
  //   try {
  //     await db.transaction.upsert({
  //       where: {
  //         id: params?.id ?? "",
  //       },
  //       update: baseDataUpper,
  //       create: baseDataUpper,
  //     });
  //   } catch (error) {
  //     console.error("Erro ao executar upsert:", error);
  //     throw new Error("Falha ao atualizar ou criar a transação");
  //   }
  // } else {
  //   try {
  //     await db.transaction.create({
  //       data: baseDataUpper,
  //     });
  //   } catch (error) {
  //     console.error("Erro ao criar transação:", error);
  //     throw new Error("Falha ao criar nova transação");
  //   }
  // }

  if (params.id) {
    await db.transaction.upsert({
      where: { id: params.id },
      update: baseDataUpper,
      create: baseDataUpper,
    });
  } else {
    await db.transaction.create({ data: baseDataUpper });
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
