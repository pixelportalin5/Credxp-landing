"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ForminatorCTAProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  onOpenForm: () => void;
};

/** Primary CTA styled as btn-primary / btn-outline — opens Forminator form 14 */
export function ForminatorCTA({ children, className, onOpenForm, onClick, ...props }: ForminatorCTAProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={(event) => {
        onOpenForm();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
