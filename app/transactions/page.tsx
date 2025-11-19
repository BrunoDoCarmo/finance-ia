import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { Pagination } from "../_components/pagination";
import { TransactionType } from "@prisma/client";
import TransactionsClient from "./_components/transactions-client";

interface TransactionsPageProps {
  searchParams?: {
    page?: string;
    pageSize?: string;
    filterTransactionType?: string;
  };
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  // Acessar as transações do meu bando de dados
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const page = searchParams?.page;
  const rawPageSize = searchParams?.pageSize;

  const filterType = searchParams?.filterTransactionType;

  // ✅ Se faltar qualquer parâmetro, redirecionar para padrão
  if (!page || !rawPageSize || !filterType) {
    const newPage = page || "1";
    const newPageSize = rawPageSize || "15";
    const newFilterType = filterType || "ALL";

    redirect(
      `/transactions?page=${newPage}&pageSize=${newPageSize}&filterTransactionType=${newFilterType}`,
    );
  }

  const pageNumber = Number(page);

  const filterEnum =
    filterType === "ALL" ? undefined : (filterType as TransactionType);

  const total = await db.transaction.count({
    where: { userId, statusDelete: "ACTIVE", type: filterEnum },
  });

  // ✅ Definir quantidade por página (default = 15)

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
    <>
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <div className="flex gap-2">
            <TransactionsClient />
            <AddTransactionButton showText={true} />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-205px)] w-full rounded-md border-none">
          <div className="w-full overflow-x-auto">
            <div className="w-[calc(100vw-50px)] border border-gray-400 border-white/10">
              <DataTable
                columns={transactionColumns}
                data={JSON.parse(JSON.stringify(transactions))}
              />
            </div>
          </div>
        </ScrollArea>
      </div>
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        baseUrl="/transactions"
        pageSizeParam={rawPageSize}
        filterTransactionType={filterType}
      />
    </>
  );
};

export default TransactionsPage;
