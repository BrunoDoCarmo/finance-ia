"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const TimeSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());

  const YEAR_OPTIONS = Array.from({ length: 11 }, (_, i) => {
    const year = String(new Date().getFullYear() - i);
    return { value: year, label: year };
  });

  const month = searchParams.get("month") || currentMonth;
  const year = searchParams.get("year") || currentYear;

  const handleYearChange = (newYear: string) => {
    router.replace(`?month=${month}&year=${newYear}`);
  };
  const handleMonthChange = (newMonth: string) => {
    router.replace(`?month=${newMonth}&year=${year}`);
  };

  return (
    <div className="flex items-center gap-4">
      <Select onValueChange={handleMonthChange} defaultValue={month}>
        <SelectTrigger className="w-[150px] rounded-full border-gray-400 p-6 dark:border-white/10">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={handleYearChange} defaultValue={year}>
        <SelectTrigger className="w-[130px] rounded-full border-gray-400 p-6 dark:border-white/10">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default TimeSelect;
