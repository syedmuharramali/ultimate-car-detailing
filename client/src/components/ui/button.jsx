import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pre-themed to the Dark Luxury palette rather than shadcn's neutral
 * defaults. The pill shape and gold fill match the CTAs the site already
 * uses, so swapping a hand-rolled button for this one is invisible.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-body font-semibold outline-none transition-all duration-300 ease-[var(--ease-luxe)] disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-full bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_8px_30px_-8px_var(--primary)] active:scale-[0.98]",
        outline:
          "rounded-full border border-primary/60 bg-transparent text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98]",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
        subtle:
          "rounded-full border border-border bg-transparent text-foreground/85 hover:border-foreground/40 hover:text-foreground active:scale-[0.98]",
        ghost: "rounded-full text-foreground/70 hover:bg-accent hover:text-accent-foreground",
        destructive:
          "rounded-full bg-destructive text-destructive-foreground hover:brightness-110 active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-7 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-15 px-10 text-base tracking-wide",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
