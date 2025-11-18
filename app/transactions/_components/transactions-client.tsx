"use client";

import Modal from "@/app/_components/modal";
import { useState } from "react";
import FilterTransactionType from "./filter-type-transaction";
import SelectPageSize from "@/app/_components/select-pageSize";
import { ListFilter } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface TransactionsClientProp {
  searchParams?: {
    pageSize?: string;
    filterTransactionType?: string;
  };
}

const TransactionsClient = ({ searchParams }: TransactionsClientProp) => {
  const [openFilters, setOpenFilters] = useState(false);

  const filterType = searchParams?.filterTransactionType;
  const rawPageSize = searchParams?.pageSize;

  return (
    <>
      <Button
        className="bg-muted-foreground hover:bg-muted-foreground"
        onClick={() => setOpenFilters(true)}
      >
        <ListFilter />
        Filtros
      </Button>
      <Modal
        open={openFilters}
        onOpenChange={setOpenFilters}
        title="Realize a filtragem de acordo com a sua necessidade!"
        description={
          <div className="flex w-full flex-1 flex-row justify-center gap-2">
            <div className="flex w-full flex-1 flex-row justify-center gap-2">
              <FilterTransactionType filterTransactionType={filterType} />
              <SelectPageSize pageSize={rawPageSize} />
            </div>
          </div>
        }
        confirmLabel="Fechar"
        cancelLabel="Cancelar"
        showCancel={false}
        onConfirm={() => setOpenFilters(false)}
        classNameAction="bg-primary hover:bg-primary/80"
      />
    </>
  );
};

export default TransactionsClient;
