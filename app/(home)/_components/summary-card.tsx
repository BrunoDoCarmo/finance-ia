import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/currency";
import clsx from "clsx";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card
      className={clsx("border transition-opacity duration-300", {
        "border-gray-400 dark:border-white/10": size === "small",
        "bg-gray-300 dark:border-white/5 dark:bg-white/10": size === "large",
      })}
    >
      <CardHeader className="flex flex-row items-center gap-2">
        <div className="flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5">
          {icon}
        </div>
        <p
          className={clsx(
            {
              "text-muted-foreground": size === "small",
              "text-black opacity-70 dark:text-white": size === "large",
            },
            // `${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`
          )}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`font-bold ${size === "small" ? "text-sm sm:text-2xl" : "text-xl sm:text-4xl"}`}
        >
          {formatCurrency(amount)}
        </p>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
