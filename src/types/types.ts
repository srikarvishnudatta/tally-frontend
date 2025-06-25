import { ReactNode } from "react";

type DefaultProps = {
    className?:string
}

export type ButtonProps = DefaultProps & {
    children?: ReactNode,
    variant?: string,
    type?: 'submit' | 'button' | 'reset',
    disabled?:boolean
}

type HTMLInputAttribute = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"

export type InputProps = DefaultProps & {
    id?:string,
    name?:string,
    required?:boolean,
    type?:HTMLInputAttribute,
    defaultValue?:string,
    placeholder?:string
}