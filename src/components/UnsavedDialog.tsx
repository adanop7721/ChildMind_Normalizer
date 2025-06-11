import type { FC } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { X } from "lucide-react";

import Button from "./Button";

interface UnsavedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAbandon: () => void;
  onSaveAndNavigate: () => void;
}

const UnsavedDialog: FC<UnsavedDialogProps> = ({
  isOpen,
  onClose,
  onAbandon,
  onSaveAndNavigate,
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    className="fixed z-50 inset-0 overflow-y-auto"
  >
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
    <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
      <DialogPanel className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <DialogTitle className="text-lg font-bold mb-2">
          Unsaved Changes
        </DialogTitle>
        <Description className="mb-4 text-gray-600">
          You have unsaved changes. What would you like to do?
        </Description>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onAbandon}>
            Abandon
          </Button>
          <Button variant="primary" onClick={onSaveAndNavigate}>
            Save
          </Button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
);

export default UnsavedDialog;
