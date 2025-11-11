import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { ScrollArea } from "../_components/ui/scroll-area";
import { Pagination } from "../_components/pagination";
import SelectPageSize from "../_components/selectPageSize";

interface TransactionsPageProps {
  searchParams?: {
    page?: string;
    pageSize?: string;
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

  // ✅ Se faltar qualquer parâmetro, redirecionar para padrão
  if (!page || !rawPageSize) {
    const newPage = page || "1";
    const newPageSize = rawPageSize || "15";

    redirect(`/transactions?page=${newPage}&pageSize=${newPageSize}`);
  }

  const pageNumber = Number(page);

  const total = await db.transaction.count({
    where: { userId, statusDelete: "ACTIVE" },
  });

  // ✅ Definir quantidade por página (default = 15)

  const pageSize = rawPageSize === "ALL" ? total : Number(rawPageSize);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      statusDelete: "ACTIVE",
    },
    orderBy: { date: "desc" },
    skip: (pageNumber - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <SelectPageSize pageSize={rawPageSize} />
          <AddTransactionButton />
        </div>
        <ScrollArea className="h-[calc(100vh-150px)] w-full rounded-md border-none">
          <div className="overflow-x-auto">
            <div className="w-[calc(100vw-50px)]">
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
      />
    </>
  );
};

export default TransactionsPage;
