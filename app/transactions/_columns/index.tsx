"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

export const TransactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: Transaction } }) => {
      if (Transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted font-bold text-primary hover:border-primary hover:bg-muted">
            <CircleIcon className="mr-2 fill-primary" size={10} />
            Depósito
          </Badge>
        );
      }
      if (Transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="bg-danger bg-opacity-10 font-bold text-danger hover:border-danger hover:bg-muted">
            <CircleIcon className="mr-2 fill-danger" size={10} />
            Despesa
          </Badge>
        );
      }
      return (
        <Badge className="bg-white bg-opacity-10 font-bold text-white hover:border-white hover:bg-muted">
          <CircleIcon className="mr-2 fill-white" size={10} />
          Investimento
        </Badge>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
    header: "",
  },
];
