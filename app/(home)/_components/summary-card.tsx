import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_utils/currency";
import { TransactionType } from "@prisma/client";
import clsx from "clsx";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  type: TransactionType;
  disabled?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  type,
  disabled = false,
}: SummaryCardProps) => {
  const isSmall = size === "small";

  return (
    <Card
      className={clsx("border transition-opacity duration-300", {
        "border-gray-400 dark:border-white/10": isSmall,
        "bg-gray-300 dark:border-white/5 dark:bg-white/10": !isSmall,
      })}
    >
      <CardHeader className="flex flex-row items-center gap-2">
        {/* Mobile */}
        <div className="flex flex-col items-center gap-2 md:hidden">
          {isSmall && (
            <AddTransactionButton
              showText={false}
              defaultType={type}
              disabledTypeSelect={disabled}
            />
          )}

          <div className="flex flex-row items-center gap-2">
            <div className="flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5">
              {icon}
            </div>
            <p
              className={clsx({
                "text-muted-foreground": isSmall,
                "text-black opacity-70 dark:text-white": !isSmall,
              })}
            >
              {title}
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div
          className={clsx(
            "hidden w-full flex-col-reverse justify-between sm:flex lg:flex-row",
            {
              "items-center": isSmall,
            },
          )}
        >
          {/* <div className="hidden w-full flex-col-reverse items-center justify-between sm:flex lg:flex-row"> */}
          <div className="flex justify-normal gap-2">
            <div className="flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5">
              {icon}
            </div>
            <p
              className={clsx({
                "text-muted-foreground": isSmall,
                "text-black opacity-70 dark:text-white": !isSmall,
              })}
            >
              {title}
            </p>
          </div>
          {isSmall && (
            <AddTransactionButton
              showText={false}
              defaultType={type}
              disabledTypeSelect={disabled}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="flex justify-between">
        <p
          className={clsx("font-bold", {
            "text-sm sm:text-xl lg:text-2xl": isSmall,
            "text-xl sm:text-4xl": !isSmall,
          })}
        >
          {formatCurrency(amount)}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
