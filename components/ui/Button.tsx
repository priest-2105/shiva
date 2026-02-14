import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// I'm using a simple approach without cva for now since I didn't install class-variance-authority yet.
// Wait, I should probably use it or just manual classes for simplicity if I want to stick to the plan strictly.
// The plan said "none" for automated tests, but didn't explicitly forbid other libs. 
// However, to keep it simple and strictly follow "standard" manual setup:

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "destructive"
    size?: "sm" | "md" | "lg"
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
        const Comp = "button"

        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            primary: "bg-primary text-white hover:bg-primary-hover border border-transparent shadow-sm",
            secondary: "bg-secondary text-foreground hover:bg-black/5 dark:hover:bg-white/10",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            destructive: "bg-tertiary text-white hover:bg-tertiary/90",
        }

        const sizes = {
            sm: "h-9 rounded-md px-3",
            md: "h-10 px-4 py-2",
            lg: "h-11 rounded-md px-8",
        }

        return (
            <Comp
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
