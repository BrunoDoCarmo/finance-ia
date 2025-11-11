"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // ex: "/transactions"
  pageSizeParam?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  pageSizeParam,
}: PaginationProps) {
  const pages = generatePages(currentPage, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {/* Botão anterior */}
      {currentPage <= 1 ? (
        <Button variant="outline" size="sm" disabled>
          Anterior
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`${baseUrl}?page=${currentPage - 1}&pageSize=${pageSizeParam}`}
          >
            Anterior
          </Link>
        </Button>
      )}

      {/* Números */}
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
            className={clsx(page === currentPage && "pointer-events-none")}
          >
            <Link href={`${baseUrl}?page=${page}&pageSize=${pageSizeParam}`}>
              {page}
            </Link>
          </Button>
        ),
      )}

      {/* Botão próximo */}
      {currentPage >= totalPages ? (
        <Button variant="outline" size="sm" disabled>
          Próxima
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`${baseUrl}?page=${currentPage + 1}&pageSize=${pageSizeParam}`}
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
