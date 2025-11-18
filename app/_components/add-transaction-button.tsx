"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { TransactionType } from "@prisma/client";

interface AddTransactionButtonProps {
  showText?: boolean;
  defaultType?: TransactionType;
  disabledTypeSelect?: boolean;
}

const AddTransactionButton = ({
  showText = false,
  defaultType,
  disabledTypeSelect,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button className="font-bold" onClick={() => setDialogIsOpen(true)}>
        <ArrowDownUpIcon />
        {showText && <p>Nova Transação</p>}
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultType={defaultType}
        disabledTypeSelect={disabledTypeSelect}
      />
    </>
  );
};

export default AddTransactionButton;
