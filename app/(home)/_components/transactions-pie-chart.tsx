"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";
import EmptyState from "@/app/_components/empty-state";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesa",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const TransactionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const hasData =
    depositsTotal > 0 || investmentsTotal > 0 || expensesTotal > 0;

  if (!hasData) {
    return <EmptyState />;
  }

  const remainingDepositsTotal =
    ((depositsTotal - investmentsTotal - expensesTotal) / depositsTotal) * 100;
  const remainingExpensesTotal = (expensesTotal / depositsTotal) * 100;
  const remainingInvestmentsTotal = (investmentsTotal / depositsTotal) * 100;
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: remainingDepositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: remainingExpensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: remainingInvestmentsTotal,
      fill: "#FFFFFF",
    },
  ];

  // const chartData = [
  //   {
  //     type: TransactionType.DEPOSIT,
  //     amount: depositsTotal,
  //     fill: "#55B02E",
  //   },
  //   {
  //     type: TransactionType.EXPENSE,
  //     amount: expensesTotal,
  //     fill: "#E93030",
  //   },
  //   {
  //     type: TransactionType.INVESTMENT,
  //     amount: investmentsTotal,
  //     fill: "#FFFFFF",
  //   },
  // ];

  return (
    <Card className="flex flex-col border-gray-400 dark:border-white/10">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
        <div className="space-y-4 pb-2 md:pb-0">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesa"
            value={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
