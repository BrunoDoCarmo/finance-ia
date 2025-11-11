"use client";

import Link from "next/link";
import { Button } from "./ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // ex: "/transactions"
  pageSizeParam?: string;
  filterTransactionType?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  pageSizeParam,
  filterTransactionType,
}: PaginationProps) {
  const pages = generatePages(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {currentPage <= 1 ? (
        <Button variant="outline" size="sm" disabled>
          Anterior
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`${baseUrl}?page=${currentPage - 1}&pageSize=${pageSizeParam}&filterTransactionType=${filterTransactionType}`}
          >
            Anterior
          </Link>
        </Button>
      )}

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1 text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link
              href={`${baseUrl}?page=${page}&pageSize=${pageSizeParam}&filterTransactionType=${filterTransactionType}`}
            >
              {page}
            </Link>
          </Button>
        ),
      )}

      {currentPage >= totalPages ? (
        <Button variant="outline" size="sm" disabled>
          Próxima
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`${baseUrl}?page=${currentPage + 1}&pageSize=${pageSizeParam}&filterTransactionType=${filterTransactionType}`}
          >
            Próxima
          </Link>
        </Button>
      )}
    </div>
  );
}

// Gera lista de páginas com reticências
function generatePages(current: number, total: number) {
  const pages: (number | "...")[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}
