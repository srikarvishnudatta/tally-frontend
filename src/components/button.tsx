import { ButtonProps } from "@/types/types";
import { cn } from "@/utils/cn";


export default function Button({children, className, variant, ...rest}:ButtonProps){
    return <button {...rest} className={cn("px-4 py-2 rounded-lg", {"bg-primary text-white": variant === "primary", 
        "bg-secondary text-black": variant === "secondary", 
        "bg-red-500 hover:bg-red-400 text-white": variant === "destructive"} , className)}>{children}</button>
}