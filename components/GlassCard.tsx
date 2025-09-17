import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "elevated"
}

export default function GlassCard({ children, className, variant = "default" }: GlassCardProps) {
  const baseClasses =
    variant === "elevated"
      ? "glass-card bg-background/90 border-primary/20"
      : "glass bg-background/80 border-primary/15"

  return <div className={cn(baseClasses, "p-6 text-foreground", className)}>{children}</div>
}
