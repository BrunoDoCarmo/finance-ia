"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ITEMS_OPTIONS = [
  { value: "6", label: "6 itens" },
  { value: "10", label: "10 itens" },
  { value: "15", label: "15 itens" },
  { value: "25", label: "25 itens" },
  { value: "25", label: "25 itens" },
  { value: "50", label: "50 itens" },
  { value: "100", label: "100 itens" },
  { value: "ALL", label: "Tudo" },
];

interface SelectPageSizeProps {
  pageSize?: string;
}

export default function PageSizeSelect({ pageSize }: SelectPageSizeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", value);
    params.set("page", "1"); // ✅ Resetar para página 1

    router.push(`/transactions?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleChange} value={pageSize}>
      <SelectTrigger className="w-[150px] rounded-full border-gray-400 dark:border-white/10">
        <SelectValue placeholder="Itens" />
      </SelectTrigger>

      <SelectContent>
        {ITEMS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
