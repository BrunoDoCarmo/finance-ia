import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { TransactionType } from "@prisma/client";

interface SummaryCards {
  month: string;
  year: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
}: SummaryCards) => {
  return (
    <div className="space-y-3">
      {/* PRIMEIRO CARD */}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="SALDO"
        amount={balance}
        size="large"
        type={TransactionType.INVESTMENT} // pode ser qualquer default, não abre modal aqui
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="INVESTIDO"
          amount={investmentsTotal}
          type={TransactionType.INVESTMENT}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="RECEITA"
          amount={depositsTotal}
          type={TransactionType.DEPOSIT}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="DESPESA"
          amount={expensesTotal}
          type={TransactionType.EXPENSE}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
