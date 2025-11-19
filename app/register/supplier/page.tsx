"use client";

import { Button } from "../../_components/ui/button";
import { ListFilter, PlusIcon } from "lucide-react";

import { useState } from "react";
import Modal from "@/app/_components/modal";

const SupplierPage = () => {
  const [openFilters, setOpenFilters] = useState(false);
  return (
    <>
      <div className="space-y-6 overflow-hidden p-6">
        {/* TITULO E BOTÃO */}
        <div className="flex h-6 w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Fornecedor</h1>
          <div className="flex gap-2">
            <Button
              className="bg-muted-foreground hover:bg-muted-foreground"
              onClick={() => setOpenFilters(true)}
            >
              <ListFilter />
              Filtros
            </Button>
            <Button>
              <PlusIcon />
              Novo Cadastro
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={openFilters}
        onOpenChange={setOpenFilters}
        title="Realize a filtragem de acordo com a sua necessidade!"
        description={
          <div className="flex w-full flex-1 flex-row justify-center gap-2">
            {/* coloque os inputs de filtro aqui */}
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

export default SupplierPage;
