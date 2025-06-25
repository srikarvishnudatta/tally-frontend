import { InputProps } from "@/types/types";
import { cn } from "@/utils/cn";

export default function Input({className, ...rest}: InputProps){
    return <input {...rest} className={cn("px-3 py-1.5 border border-gray-300 rounded-md",className)} />
}