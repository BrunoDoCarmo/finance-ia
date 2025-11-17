import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { ScrollArea } from "../_components/ui/scroll-area";
import { Pagination } from "../_components/pagination";
import SelectPageSize from "../_components/select-pageSize";
import FilterTransactionType from "./_components/filter-type-transaction";
import { TransactionType } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../_components/ui/alert-dialog";
import { Button } from "../_components/ui/button";
import { ListFilter } from "lucide-react";
import RouterBack from "../_components/router-back";

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
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <RouterBack />
            <h1 className="text-2xl font-bold">Transações</h1>
          </div>
          <div className="hidden flex-row gap-2 md:flex">
            <FilterTransactionType filterTransactionType={filterType} />
            <SelectPageSize pageSize={rawPageSize} />
            <AddTransactionButton showText={true} />
          </div>
          <div className="flex flex-row gap-2 md:hidden">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ListFilter />
                  Filtros
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Realize a filtragem de acordo com a sua necessidade!
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex w-full flex-1 flex-row justify-center gap-2">
                      <FilterTransactionType
                        filterTransactionType={filterType}
                      />
                      <SelectPageSize pageSize={rawPageSize} />
                      <AddTransactionButton showText={true} />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-gray-400 dark:border-white/10">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-primary text-white hover:bg-primary/80">
                    Fechar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
