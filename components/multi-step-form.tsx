"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

interface MultiStepFormProps {
  onComplete?: () => void;
}

type Field =
  | { name: string; label: string; type: "text" | "email"; required: boolean }
  | { name: string; label: string; type: "select"; required: boolean; options: string[] }
  | { name: string; label: string; type: "textarea"; required: boolean; placeholder: string };

const steps: { id: string; title: string; subtitle: string; fields: Field[] }[] = [
  {
    id: "basics",
    title: "Let\u0027s Start",
    subtitle: "Tell us about yourself",
    fields: [
      { name: "name", label: "Your Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "company", label: "Company Name", type: "text", required: false },
    ],
  },
  {
    id: "project",
    title: "Project Details",
    subtitle: "What are we building?",
    fields: [
      {
        name: "service",
        label: "Service Needed",
        type: "select",
        required: true,
        options: [
          "Brand Identity",
          "Web Development",
          "Growth Marketing",
          "Social Media",
          "Content Production",
          "SEO \u0026 Content",
          "Multiple Services",
        ],
      },
      {
        name: "budget",
        label: "Budget Range",
        type: "select",
        required: true,
        options: [
          "$10,000 - $25,000",
          "$25,000 - $50,000",
          "$50,000 - $100,000",
          "$100,000+",
        ],
      },
      {
        name: "timeline",
        label: "Timeline",
        type: "select",
        required: true,
        options: ["ASAP", "1-2 months", "3-6 months", "6+ months"],
      },
    ],
  },
  {
    id: "message",
    title: "Final Details",
    subtitle: "Anything else we should know?",
    fields: [
      {
        name: "message",
        label: "Project Description",
        type: "textarea",
        required: true,
        placeholder: "Tell us about your goals, challenges, and vision...",
      },
    ],
  },
];

export function MultiStepForm({ onComplete }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart("multi_step_contact");
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    trackFormSubmit("multi_step_contact");
    setIsSubmitting(false);
    setIsComplete(true);
    onComplete?.();
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, delay: 0.2 }}
          >
            <Check className="w-12 h-12 text-primary" />
          </motion.div>
        </div>
        <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Thanks for reaching out. We\u0027ll get back to you within 24 hours to
          discuss your project.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Step header */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mb-8"
      >
        <h3 className="text-2xl font-bold mb-2">{currentStepData.title}</h3>
        <p className="text-muted-foreground">{currentStepData.subtitle}</p>
      </motion.div>

      {/* Form */}
      <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : undefined}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {currentStepData.fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium mb-2"
              >
                {field.label}
                {field.required && (
                  <span className="text-primary ml-1">*</span>
                )}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary outline-none transition-colors resize-none"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary outline-none transition-colors"
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="group flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300"
            >
              Next
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 disabled:opacity-70 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
