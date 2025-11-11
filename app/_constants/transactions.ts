import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_ICONS: Record<
  TransactionPaymentMethod,
  { icon: string; color: string }
> = {
  [TransactionPaymentMethod.CREDIT_CARD]: {
    icon: "/credit-card.svg",
    color: "#1E90FF", // azul
  },
  [TransactionPaymentMethod.DEBIT_CARD]: {
    icon: "/debit-card.svg",
    color: "#32CD32", // verde
  },
  [TransactionPaymentMethod.BANK_TRANSFER]: {
    icon: "/bank-transfer.svg",
    color: "#8A2BE2", // roxo
  },
  [TransactionPaymentMethod.BANK_SLIP]: {
    icon: "/bank-slip.svg",
    color: "#FF8C00", // laranja
  },
  [TransactionPaymentMethod.CASH]: {
    icon: "/money.svg",
    color: "#228B22", // verde escuro
  },
  [TransactionPaymentMethod.PIX]: {
    icon: "/pix.svg",
    color: "#06B6D4", // ciano
  },
  [TransactionPaymentMethod.OTHER]: {
    icon: "/other.svg",
    color: "#808080", // cinza
  },
};

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: "EDUCAÇÃO",
  ENTERTAINMENT: "ENTRETENIMENTO",
  FOOD: "ALIMENTAÇÃO",
  HEALTH: "SAÚDE",
  HOUSING: "MORADIA",
  OTHER: "OUTROS",
  SALARY: "SALÁRIO",
  TRANSPORTATION: "TRANSPORTE",
  UTILITY: "UTILIDADES",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "TRANSFERÊNCIA BANCARIA",
  BANK_SLIP: "BOLETO BANCÁRIO",
  CASH: "DINHEIRO",
  CREDIT_CARD: "CARTÃO DE CRÉDITO",
  DEBIT_CARD: "CARTÃO DE DÉBITO",
  OTHER: "OUTROS",
  PIX: "PIX",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "DESPESA",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "DEPÓSITO",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "INVESTIMENTO",
  },
];

export const TRANSACTION_STATUS_DELETE_LABELS = {
  ACTIVE: "ATIVO",
  DISABLED: "DESATIVADO",
};

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.EDUCATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.EDUCATION],
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
  },
  {
    value: TransactionCategory.FOOD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD],
  },
  {
    value: TransactionCategory.HEALTH,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HEALTH],
  },
  {
    value: TransactionCategory.HOUSING,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
  },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
  },
  {
    value: TransactionCategory.SALARY,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
  },
  {
    value: TransactionCategory.UTILITY,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UTILITY],
  },
];
