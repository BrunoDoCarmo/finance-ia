import EmptyState from "@/app/_components/empty-state";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";

interface ExpensesPerCategoryProps {
  expersePerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expersePerCategory,
}: ExpensesPerCategoryProps) => {
  const hasData = expersePerCategory && expersePerCategory.length > 0;
  if (!hasData) {
    return <EmptyState />;
  }
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border border-gray-400 p-6 dark:border-white/10">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-3">
        {expersePerCategory.map((category) => (
          <div key={category.category} className="space-y-1">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">{category.category}</p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
