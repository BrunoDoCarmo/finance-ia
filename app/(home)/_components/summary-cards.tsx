import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

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
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="INVESTIDO"
          amount={investmentsTotal}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="RECEITA"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="DESPESA"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
