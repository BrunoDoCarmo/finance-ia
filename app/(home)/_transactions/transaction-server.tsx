import { TransactionsClient } from "./transaction-client";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import { redirect } from "next/navigation";
import { TransactionType } from "@prisma/client";

export default async function TransactionServer({ searchParams }) {
  // Acessar as transações do meu bando de dados
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const page = searchParams?.page || "1";
  const rawPageSize = searchParams?.pageSize || "15";
  const filterType = searchParams?.filterTransactionType || "ALL";

  const pageNumber = Number(page);
  const filterEnum =
    filterType === "ALL" ? undefined : (filterType as TransactionType);

  const total = await db.transaction.count({
    where: { userId, statusDelete: "ACTIVE", type: filterEnum },
  });

  const pageSize = rawPageSize === "ALL" ? total : Number(rawPageSize);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      statusDelete: "ACTIVE",
      type: filterEnum, // ✅ ADICIONE ISSO
    },
    orderBy: { date: "desc" },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <TransactionsClient
      transaction={JSON.parse(JSON.stringify(transactions))}
      totalPages={totalPages}
      pageNumber={pageNumber}
      rawPageSize={rawPageSize}
      filterType={filterType}
    />
  );
}
