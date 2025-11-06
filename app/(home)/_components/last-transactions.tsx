import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Transaction } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/app/_utils/currency";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getPriceColor = (transaction: Transaction) => {
    if (transaction.type === "EXPENSE") {
      return "text-red-500";
    }
    if (transaction.type === "DEPOSIT") {
      return "text-primary";
    }
    return "text-yellow-500";
  };
  return (
    <ScrollArea className="rounded-md border border-gray-400 dark:border-white/10">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button
          variant="outline"
          className="rounded-full border-gray-400 font-bold"
          asChild
        >
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {lastTransactions.map((transaction) => (
          // eslint-disable-next-line react/jsx-key
          <div className="flex items-center justify-between rounded-lg border border-gray-400 p-3 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-300 dark:bg-white/10">
                <Image src="/pix.svg" alt="PIX" width={20} height={20} />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getPriceColor(transaction)}`}>
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
