import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Transaction, TransactionType } from "@prisma/client";
import Link from "next/link";
import { formatCurrency } from "@/app/_utils/currency";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { dateNumeric } from "@/app/_utils/date";
import EmptyState from "@/app/_components/empty-state";

type SerializedTransaction = Omit<Transaction, "amount"> & {
  amount: number;
};
interface LastTransactionsProps {
  lastTransactions: SerializedTransaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: SerializedTransaction) => {
    if (transaction.type === "EXPENSE") {
      return "text-red-500";
    }
    if (transaction.type === "DEPOSIT") {
      return "text-primary";
    }
    return "text-blue-600 dark:text-blue-300";
  };

  const getAmountPrefix = (transaction: SerializedTransaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  const hasData = lastTransactions.length > 0;

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
        {!hasData ? (
          <EmptyState />
        ) : (
          lastTransactions.map((transaction) => {
            // eslint-disable-next-line react/jsx-key
            const method =
              TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod];
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg border border-gray-400 p-3 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-300 p-3 dark:bg-white/10">
                    <div
                      className="h-5 w-5"
                      style={{
                        backgroundColor: method.color,
                        maskImage: `url(${method.icon})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskImage: `url(${method.icon})`,
                        WebkitMaskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                      }}
                    />
                  </div>
                  <div>
                    <p className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold md:max-w-[100%]">
                      {transaction.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dateNumeric(transaction.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`whitespace-nowrap text-sm font-bold ${getAmountColor(transaction)}`}
                >
                  {getAmountPrefix(transaction)}
                  {formatCurrency(Number(transaction.amount))}
                </p>
              </div>
            );
          })
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
