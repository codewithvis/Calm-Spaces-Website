"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, Type, Eye, ZapOff, Check, RotateCcw } from "lucide-react";

type TextSize = "normal" | "large" | "xlarge";

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Load persisted settings
    const storedSize = (localStorage.getItem("calm_spaces_text_size") as TextSize) || "normal";
    const storedContrast = localStorage.getItem("calm_spaces_high_contrast") === "true";
    const storedMotion = localStorage.getItem("calm_spaces_reduced_motion") === "true";

    setTextSize(storedSize);
    setHighContrast(storedContrast);
    setReducedMotion(storedMotion);

    applySettings(storedSize, storedContrast, storedMotion);
  }, []);

  function applySettings(size: TextSize, contrast: boolean, motion: boolean) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Text size
    root.classList.remove("text-size-normal", "text-size-large", "text-size-xlarge");
    root.classList.add(`text-size-${size}`);
    if (size === "large") {
      root.style.fontSize = "112%";
    } else if (size === "xlarge") {
      root.style.fontSize = "125%";
    } else {
      root.style.fontSize = "100%";
    }

    // High contrast
    if (contrast) {
      root.classList.add("high-contrast-mode");
    } else {
      root.classList.remove("high-contrast-mode");
    }

    // Reduced motion
    if (motion) {
      root.classList.add("force-reduced-motion");
    } else {
      root.classList.remove("force-reduced-motion");
    }
  }

  function handleSizeChange(size: TextSize) {
    setTextSize(size);
    localStorage.setItem("calm_spaces_text_size", size);
    applySettings(size, highContrast, reducedMotion);
  }

  function handleContrastToggle() {
    const next = !highContrast;
    setHighContrast(next);
    localStorage.setItem("calm_spaces_high_contrast", String(next));
    applySettings(textSize, next, reducedMotion);
  }

  function handleMotionToggle() {
    const next = !reducedMotion;
    setReducedMotion(next);
    localStorage.setItem("calm_spaces_reduced_motion", String(next));
    applySettings(textSize, highContrast, next);
  }

  function resetAll() {
    setTextSize("normal");
    setHighContrast(false);
    setReducedMotion(false);
    localStorage.removeItem("calm_spaces_text_size");
    localStorage.removeItem("calm_spaces_high_contrast");
    localStorage.removeItem("calm_spaces_reduced_motion");
    applySettings("normal", false, false);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open accessibility options"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--calm-border-soft)] bg-white text-[var(--calm-text-muted)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] transition shadow-xs"
        title="Accessibility Settings"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-12 z-50 w-72 origin-top-right rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 shadow-xl ring-1 ring-black/5"
          role="region"
          aria-label="Accessibility settings"
        >
          <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
              Accessibility Options
            </span>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--calm-text-muted)] hover:text-[var(--color-brand-primary)]"
              title="Reset to default settings"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="mt-4 space-y-4 text-xs">
            {/* Text Sizing */}
            <div>
              <div className="flex items-center gap-1.5 font-semibold text-[var(--color-text-primary)] mb-2">
                <Type className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                <span>Text Size</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["normal", "large", "xlarge"] as const).map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleSizeChange(s)}
                    className={`rounded-xl border py-1.5 text-center text-xs font-medium transition ${
                      textSize === s
                        ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] font-bold"
                        : "border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] text-[var(--color-text-secondary)] hover:bg-white"
                    }`}
                  >
                    {s === "normal" ? "Default" : s === "large" ? "+15%" : "+25%"}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-[var(--calm-border-soft)] p-2.5 bg-[var(--calm-white-warm)]">
              <div className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                <span className="font-semibold text-[var(--color-text-primary)]">High Contrast</span>
              </div>
              <button
                type="button"
                onClick={handleContrastToggle}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  highContrast ? "bg-[var(--color-brand-primary)]" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={highContrast}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    highContrast ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between rounded-xl border border-[var(--calm-border-soft)] p-2.5 bg-[var(--calm-white-warm)]">
              <div className="flex items-center gap-2">
                <ZapOff className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                <span className="font-semibold text-[var(--color-text-primary)]">Reduced Motion</span>
              </div>
              <button
                type="button"
                onClick={handleMotionToggle}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  reducedMotion ? "bg-[var(--color-brand-primary)]" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={reducedMotion}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    reducedMotion ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-4 border-t border-[var(--calm-border-soft)] pt-2.5 text-center">
            <a
              href="/accessibility"
              className="text-[11px] font-semibold text-[var(--color-brand-primary)] hover:underline"
            >
              Read WCAG 2.2 AA Statement
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
