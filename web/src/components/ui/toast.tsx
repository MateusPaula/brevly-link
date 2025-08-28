import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { X } from "@phosphor-icons/react";
import { tv } from "tailwind-variants";

const toastVariants = tv({
	base: 'rounded-md p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] border',
	variants: {
		variant: {
			error: 'bg-red-200 border-red-300 text-red-800',
			success: 'bg-green-50 border-green-200 text-green-800',
			warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
			info: 'bg-blue-50 border-blue-200 text-blue-800',
		}
	}
})

type ToastProps = {
	title: string;
	description: string;
	shouldOpen: boolean;
	className?: string;
	variant?: 'error' | 'success' | 'warning' | 'info';
}

export function ToastDemo({ title, description, shouldOpen, className, variant = 'info' }: ToastProps) {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setOpen(shouldOpen);
	}, [shouldOpen]);

	return (
		<Toast.Provider swipeDirection="right" duration={3000}>
			<Toast.Root
				className={`${toastVariants({ variant })} ${className} relative flex flex-col gap-2 data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
				open={open}
				onOpenChange={setOpen}
				duration={3000}
			>
				<Toast.Title className="text-md font-bold leading-tight">
					{title}
				</Toast.Title>

				
				<Toast.Description className="text-sm opacity-90 leading-relaxed">
					{description}
				</Toast.Description>
			</Toast.Root>
			
			<Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
		</Toast.Provider>
	);
}