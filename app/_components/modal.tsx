import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

const Modal = ({
  open,
  onOpenChange,
  title = "Confirmação",
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  showCancel = true,
  onConfirm,
}: ModalProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {/* 🔹 Aqui pode ser string, componente ou qualquer JSX */}
          {description && (
            <AlertDialogDescription
              asChild={typeof description !== "string"} // permite renderizar JSX puro
            >
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel className="border-gray-400 dark:border-white/10">
              {cancelLabel}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-danger text-white hover:bg-danger/80"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
