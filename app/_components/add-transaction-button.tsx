"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { TransactionType } from "@prisma/client";

interface AddTransactionButtonProps {
  showText?: boolean;
  defaultType?: TransactionType;
}

const AddTransactionButton = ({
  showText = false,
  defaultType,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        {showText && <p>Adicionar Transação</p>}

        <ArrowDownUpIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultType={defaultType}
      />
    </>
  );
};

export default AddTransactionButton;
