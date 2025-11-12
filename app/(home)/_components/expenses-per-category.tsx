import EmptyState from "@/app/_components/empty-state";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expersePerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expersePerCategory,
}: ExpensesPerCategoryProps) => {
  const hasData = expersePerCategory && expersePerCategory.length > 0;
  return (
    <ScrollArea className="col-span-2 rounded-md border border-gray-400 dark:border-white/10">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3">
        {!hasData ? (
          <EmptyState />
        ) : (
          expersePerCategory.map((category) => (
            <div key={category.category} className="space-y-1">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          ))
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
