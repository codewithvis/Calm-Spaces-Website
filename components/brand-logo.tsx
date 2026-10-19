import Image from "next/image";
import Link from "next/link";

export interface BrandLogoProps {
  variant?: "full" | "horizontal" | "mark" | "compact";
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
  if (variant === "mark") {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
        <Image
          src="/calm-spaces-mark.svg"
          alt="C.A.L.M Spaces Brand Mark"
          width={44}
          height={44}
          className="h-10 w-10 object-contain drop-shadow-xs transition-transform duration-200 hover:scale-105"
          priority={priority}
        />
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-[var(--calm-border-soft)] bg-white p-1 shadow-xs">
          <Image
            src="/calm-spaces-mark.svg"
            alt="C.A.L.M Spaces"
            width={40}
            height={40}
            className="h-full w-full object-contain"
            priority={priority}
          />
        </div>
        <div className="flex flex-col justify-center whitespace-nowrap min-w-0">
          <span className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)] leading-tight whitespace-nowrap">
            C.A.L.M <span className="text-[var(--color-brand-primary)]">Spaces</span>
          </span>
          {showAffiliation && (
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-secondary)] whitespace-nowrap">
              CEAPS · SGT University
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full official logo display (maintains exact proportions of the official emblem)
  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <div className="relative h-11 w-14 sm:h-12 sm:w-16 shrink-0 overflow-hidden rounded-lg border border-[var(--calm-border-soft)] bg-white p-0.5 shadow-xs transition hover:shadow-sm">
        <Image
          src="/calm-spaces-official-logo.png"
          alt="C.A.L.M Spaces Official Logo"
          width={450}
          height={330}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </div>
      <div className="flex flex-col justify-center whitespace-nowrap min-w-0">
        <span className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight whitespace-nowrap">
          C.A.L.M <span className="text-[var(--color-brand-primary)]">Spaces</span>
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium text-[var(--color-text-secondary)] whitespace-nowrap leading-snug">
            Cultivating Awareness, Lightness &amp; Movement
          </span>
        )}
        {showAffiliation && (
          <div className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand-primary)] whitespace-nowrap">
              CEAPS · SGT University
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
      aria-label="C.A.L.M Spaces — Back to Homepage"
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
