import { Badge } from "@/app/_components/ui/badge";
import { TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";
import { SerializedTransaction } from "../_columns/types";

interface TransactionTypeBadgeProps {
  transaction: SerializedTransaction; // antes era Transaction
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-muted font-bold uppercase text-primary hover:border-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger bg-opacity-10 font-bold uppercase text-danger hover:border-danger hover:bg-muted">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-opacity-10 font-bold uppercase text-gray-500 hover:border-gray-400 hover:bg-muted dark:text-white dark:hover:border-white/10">
      <CircleIcon className="mr-2 fill-gray-400 dark:fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
