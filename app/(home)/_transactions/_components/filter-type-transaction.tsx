"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TRANSACTION_TYPE_OPTIONS } from "@/app/_constants/transactions";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterTransactionTypeProps {
  filterTransactionType?: string;
}

const FilterTransactionType = ({
  filterTransactionType,
}: FilterTransactionTypeProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filterTransactionType", value);

    router.push(`/transactions?${params.toString()}`);
  };
  return (
    <Select onValueChange={handleChange} value={filterTransactionType}>
      <SelectTrigger className="w-[150px] rounded-full border-gray-400 dark:border-white/10">
        <SelectValue placeholder="Tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Todos</SelectItem>
        {TRANSACTION_TYPE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterTransactionType;
