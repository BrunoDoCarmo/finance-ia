import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionStatusDelete,
  TransactionType,
} from "@prisma/client";

export type SerializedTransaction = {
  id: string;
  name: string;
  type: TransactionType;
  amount: number; // AGORA É NUMBER
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  statusDelete: TransactionStatusDelete;
};
