"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type ForminatorModalProps = {
  open: boolean;
  onClose: () => void;
  formId?: number;
  title?: string;
};

export function ForminatorModal({
  open,
  onClose,
  formId = 14,
  title = "Get Investment Details",
}: ForminatorModalProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forminator-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-red-600/25 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black/8 px-5 py-4">
              <h2 id="forminator-modal-title" className="text-sm font-bold uppercase tracking-[0.14em] text-[#111111]">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close form"
                className="grid size-9 place-items-center rounded-xl border border-black/10 text-[#444444] transition hover:border-red-600/30 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>
            <iframe
              title="Credxp investment form"
              src={`/embed/forminator/${formId}`}
              className="min-h-[28rem] w-full flex-1 border-0 bg-white"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
