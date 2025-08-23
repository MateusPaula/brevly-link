import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
    base: 'text-gray-500 bg-gray-200 rounded-md border hover:border-blue-base disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none',
    variants: {
        size: {
            default: 'px-3 py-2',
            icon: 'p-2',
            'icon-sm': 'p-1',
        }
    },
    defaultVariants: {
        size: 'default'
    }
})

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}


export function Button({size, className, asChild, ...props}: ButtonProps) {
    const Component = asChild ? Slot : 'button';

    return (
        <Component className={buttonVariants({size, className})} {...props} />
    )
}