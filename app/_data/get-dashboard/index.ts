import { db } from "@/app/_lib/prisma";
import { TransactionStatusDelete, TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";
import { Decimal } from "@prisma/client/runtime/library";

export const getDashboard = async (month: string, year: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const startDate = new Date(`${year}-${month}-01T00:00:00`);
  const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59, 999);

  const where = {
    userId,
    date: {
      gte: startDate,
      lte: endDate,
    },
  };
  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "DEPOSIT",
          statusDelete: TransactionStatusDelete.ACTIVE,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "INVESTMENT",
          statusDelete: TransactionStatusDelete.ACTIVE,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          ...where,
          type: "EXPENSE",
          statusDelete: TransactionStatusDelete.ACTIVE,
        },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, statusDelete: TransactionStatusDelete.ACTIVE },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  // const typesPercentage: TransactionPercentagePerType = {
  //   [TransactionType.DEPOSIT]: transactionsTotal ? Math.round(
  //     (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
  //   ) : 0,
  //   [TransactionType.EXPENSE]: transactionsTotal ? Math.round(
  //     (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
  //   ) : 0,
  //   [TransactionType.INVESTMENT]: transactionsTotal ? Math.round(
  //     (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
  //   ) : 0,
  // };

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]: transactionsTotal
      ? Number(((Number(balance || 0) / depositsTotal) * 100).toFixed(2))
      : 0,
    [TransactionType.EXPENSE]: transactionsTotal
      ? Number(((Number(expensesTotal || 0) / depositsTotal) * 100).toFixed(2))
      : 0,
    [TransactionType.INVESTMENT]: transactionsTotal
      ? Number(
          ((Number(investmentsTotal || 0) / depositsTotal) * 100).toFixed(2),
        )
      : 0,
  };

  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
        statusDelete: TransactionStatusDelete.ACTIVE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));

  const lastTransaction = await db.transaction.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10,
  });

  const serializedLastTransaction = lastTransaction.map((t) => ({
    ...t,
    amount: t.amount instanceof Decimal ? t.amount.toNumber() : t.amount,
  }));

  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    serializedLastTransaction,
  };
};
