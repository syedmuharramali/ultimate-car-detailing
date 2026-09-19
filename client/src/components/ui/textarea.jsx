import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full resize-y rounded-sm border border-input bg-background px-3.5 py-2.5 font-body text-sm leading-relaxed text-foreground transition-colors duration-200",
        "placeholder:text-muted-foreground/70",
        "focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
