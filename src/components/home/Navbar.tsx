"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CredxpLogo } from "./CredxpLogo";
import { ForminatorCTA } from "./ForminatorCTA";

const links = ["Home", "Properties", "About"];

type NavbarProps = {
  onOpenForm?: () => void;
};

export function Navbar({ onOpenForm }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`navbar-header fixed inset-x-0 z-50 ${scrolled ? "scrolled" : ""}`}
    >
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`navbar-shell mx-auto flex items-center justify-between border ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <a href="#home" className="group flex shrink-0 items-center" aria-label="Credxp home">
          <CredxpLogo
            className="navbar-logo h-8 w-auto max-w-[9.5rem] object-contain sm:h-9 sm:max-w-[10.5rem]"
            priority
          />
        </a>

        <div className="navbar-links-pill hidden items-center gap-2 rounded-full border p-1 lg:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="navbar-link rounded-full px-5 py-2 text-sm font-medium transition duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="mailto:hello@credxp.com"
            className="navbar-email flex items-center gap-2 text-sm font-medium transition duration-300"
          >
            <Phone size={15} className="text-red-600" />
            hello@credxp.com
          </a>
          {onOpenForm ? (
            <ForminatorCTA
              onOpenForm={onOpenForm}
              className="btn-primary !py-3 !text-[11px] !text-white"
            >
              Get Started
              <ArrowRight size={15} />
            </ForminatorCTA>
          ) : (
            <a href="#contact" className="btn-primary !py-3 !text-[11px] !text-white">
              Get Started
              <ArrowRight size={15} />
            </a>
          )}
        </div>

        <button
          type="button"
          className="navbar-menu-btn grid size-11 place-items-center rounded-xl border md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-black/10 bg-white p-3 shadow-2xl md:hidden"
          >
            <div className="grid gap-1">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[#111111] hover:bg-black/5"
                >
                  {link}
                </a>
              ))}
              <a
                href="mailto:hello@credxp.com"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-[#111111]"
              >
                <Phone size={15} className="text-red-600" />
                hello@credxp.com
              </a>
              {onOpenForm ? (
                <ForminatorCTA
                  onOpenForm={() => {
                    onOpenForm();
                    setOpen(false);
                  }}
                  className="btn-primary mt-2 w-full justify-center !py-3 !text-[11px]"
                >
                  Get Started
                  <ArrowRight size={15} />
                </ForminatorCTA>
              ) : (
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white"
                >
                  Get Started
                  <ArrowRight size={15} />
                </a>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
