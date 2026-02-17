"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Gift, ArrowRight } from "lucide-react";
import { trackExitIntent, trackFormSubmit } from "@/lib/analytics";

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger if mouse leaves through the top of the page
      if (e.clientY <= 10 && !hasShown && !isOpen) {
        setIsOpen(true);
        setHasShown(true);
        trackExitIntent();
      }
    },
    [hasShown, isOpen]
  );

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("exitPopupShown");
    if (hasSeenPopup) {
      setHasShown(true);
      return;
    }

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      trackFormSubmit("exit_intent_lead_magnet");
      sessionStorage.setItem("exitPopupShown", "true");

      // Reset after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("exitPopupShown", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] w-full max-w-lg mx-4"
          >
            <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px]" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-[60px]" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                {!isSubmitted ? (
                  <>
                    {/* Gift icon */}
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Gift className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3">
                      Wait! Don&apos;t Miss Out
                    </h3>

                    <p className="text-muted-foreground mb-6">
                      Get our <span className="text-foreground font-medium">Growth Framework</span> — 
                      the exact strategy we use to generate $50M+ in revenue for our clients.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-secondary rounded-xl border border-border focus:border-primary outline-none transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full group flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300"
                      >
                        Get Free Access
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, delay: 0.2 }}
                      >
                        <svg
                          className="w-10 h-10 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">You&apos;re In!</h3>
                    <p className="text-muted-foreground">
                      Check your inbox for the Growth Framework.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
