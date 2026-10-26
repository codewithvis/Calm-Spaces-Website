import Image from "next/image";
import Link from "next/link";

export interface BrandLogoProps {
  variant?: "full" | "horizontal" | "mark" | "compact" | "dual-logos";
  className?: string;
  showAffiliation?: boolean;
  showTagline?: boolean;
  priority?: boolean;
}

export function BrandLogo({
  variant = "full",
  className = "",
  showAffiliation = true,
  showTagline = false,
  priority = false,
}: BrandLogoProps) {
  // Mark-only variant: Calm Spaces official emblem
  if (variant === "mark") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src="/calm-spaces-official-logo.png"
          alt="C.A.L.M Spaces Official Logo"
          width={450}
          height={330}
          className="h-9 w-auto object-contain drop-shadow-xs transition-transform duration-200 hover:scale-105"
          priority={priority}
        />
      </div>
    );
  }

  // Dual-logos only (no extra text labels)
  if (variant === "dual-logos") {
    return (
      <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
        {/* SGT University Main Logo */}
        <div className="relative h-9 sm:h-10 w-auto shrink-0 flex items-center justify-center rounded-lg bg-white p-1 border border-[var(--calm-border-soft)] shadow-xs">
          <Image
            src="/sgt-university-logo.jpg"
            alt="SGT University Main Official Logo"
            width={1022}
            height={386}
            className="h-full w-auto max-w-[110px] sm:max-w-[140px] object-contain"
            priority={priority}
          />
        </div>

        {/* Elegant Vertical Divider */}
        <div className="h-6 w-px bg-[var(--calm-border-soft)] shrink-0" aria-hidden="true" />

        {/* Calm Spaces Main Logo */}
        <div className="relative h-9 sm:h-10 w-auto shrink-0 flex items-center justify-center rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs">
          <Image
            src="/calm-spaces-official-logo.png"
            alt="C.A.L.M Spaces Main Official Logo"
            width={450}
            height={330}
            className="h-full w-auto max-w-[100px] sm:max-w-[125px] object-contain"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  // Compact variant for mobile headers and tight sidebars
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 shrink-0 ${className}`}>
        {/* SGT University Logo */}
        <div className="relative h-8 sm:h-9 w-auto shrink-0 flex items-center justify-center rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs">
          <Image
            src="/sgt-university-logo.jpg"
            alt="SGT University"
            width={1022}
            height={386}
            className="h-full w-auto max-w-[85px] sm:max-w-[105px] object-contain"
            priority={priority}
          />
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-[var(--calm-border-soft)] shrink-0" aria-hidden="true" />

        {/* Calm Spaces Logo */}
        <div className="relative h-8 sm:h-9 w-auto shrink-0 flex items-center justify-center rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs">
          <Image
            src="/calm-spaces-official-logo.png"
            alt="C.A.L.M Spaces"
            width={450}
            height={330}
            className="h-full w-auto max-w-[75px] sm:max-w-[95px] object-contain"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  // Full official logo display: SGT University + Calm Spaces paired with typography
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 shrink-0 min-w-0 ${className}`}>
      {/* Both Main Logos in clean, non-overlapping containers */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* SGT University Official Logo */}
        <div className="relative h-9 sm:h-11 w-auto shrink-0 flex items-center justify-center rounded-lg bg-white p-1 border border-[var(--calm-border-soft)] shadow-xs transition hover:shadow-sm">
          <Image
            src="/sgt-university-logo.jpg"
            alt="SGT University Official Logo"
            width={1022}
            height={386}
            className="h-full w-auto max-w-[100px] sm:max-w-[130px] object-contain"
            priority={priority}
          />
        </div>

        {/* Vertical Divider */}
        <div className="h-7 w-px bg-[var(--calm-border-soft)] shrink-0" aria-hidden="true" />

        {/* Calm Spaces Official Logo */}
        <div className="relative h-9 sm:h-11 w-auto shrink-0 flex items-center justify-center rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs transition hover:shadow-sm">
          <Image
            src="/calm-spaces-official-logo.png"
            alt="C.A.L.M Spaces Official Logo"
            width={450}
            height={330}
            className="h-full w-auto max-w-[90px] sm:max-w-[115px] object-contain"
            priority={priority}
          />
        </div>
      </div>

      {/* Brand Text Identity (hidden on extra small screens to prevent overlap) */}
      <div className="hidden md:flex flex-col justify-center whitespace-nowrap min-w-0">
        <span className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)] leading-tight whitespace-nowrap">
          C.A.L.M <span className="text-[var(--color-brand-primary)]">Spaces</span>
        </span>
        {showTagline && (
          <span className="text-[9.5px] font-medium text-[var(--color-text-secondary)] whitespace-nowrap leading-snug">
            Cultivating Awareness, Lightness &amp; Movement
          </span>
        )}
        {showAffiliation && (
          <div className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
            <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-primary)] whitespace-nowrap">
              SGT University
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function LogoLink({
  variant = "full",
  className = "",
  showAffiliation = true,
  showTagline = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="C.A.L.M Spaces & SGT University — Back to Homepage"
      className={`inline-flex shrink-0 items-center focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-[var(--color-brand-primary)] ${className}`}
    >
      <BrandLogo
        variant={variant}
        showAffiliation={showAffiliation}
        showTagline={showTagline}
        priority={priority}
      />
    </Link>
  );
}
