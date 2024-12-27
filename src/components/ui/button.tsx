import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 duration-500 disabled:bg-neutral-100 disabled:pointer-events-none disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-300 border border-neutral-200',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-blue-600 to-blue-800 text-primary-foreground hover:from-blue-700 hover:to-blue-900',
        destructive:
          'bg-gradient-to-l from-red-500 to-red-600 text-destructive-foreground hover:from-red-600 hover:to-red-700',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-white text-black hover:bg-neutral-100',
        ghost:
          'border-transparent shadow-background hover:bg-accent hover:bg-accent hover:text-accent-foreground',
        muted: 'bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80',
        tertiary:
          'bg-blue-100 text-blue-600 border-transparent hover:bg-blue-200 shadow-none',
      },
      size: {
        primary: 'h-10 px-6 py-3',
        extra_small: 'h-7 rounded-xl px-4 text-xs',
        small: 'h-8 rounded-xl px-4',
        large: 'h-12 rounded-xl px-8',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
