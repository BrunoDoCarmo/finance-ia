import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import { ScrollArea } from "../_components/ui/scroll-area";

const TrasactionsPage = async () => {
  // Acessar as transações do meu bando de dados
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
      statusDelete: "ACTIVE",
    },
    orderBy: { date: "desc" },
  });
  return (
    <>
      <Navbar />
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <ScrollArea>
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};
export default TrasactionsPage;
