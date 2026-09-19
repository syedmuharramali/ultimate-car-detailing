import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-sm border border-input bg-background px-3.5 py-2 font-body text-sm text-foreground transition-colors duration-200",
        "placeholder:text-muted-foreground/70",
        "focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        // Date/time pickers render a near-black icon on a near-black field
        // by default, which makes them look broken. Invert it.
        "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:hover:opacity-90",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Input };
