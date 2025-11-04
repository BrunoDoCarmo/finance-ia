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
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border p-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        {expersePerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="justify-between-w-full flex">
              <p className="text-sm font-bold">{category.category}</p>
              <p className="text-sm font-bold">{category.percentageOfTotal}</p>
            </div>
            <Progress value={category.percentageOfTotal} />
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
