import { ChangeEvent, ReactNode } from "react";

type DefaultProps = {
    className?:string
}

export type ButtonProps = DefaultProps & {
    children?: ReactNode,
    variant?: string,
    type?: 'submit' | 'button' | 'reset',
    disabled?:boolean,
    onClick?: () => void
}

type HTMLInputAttribute = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"

export type InputProps = DefaultProps & {
    id?:string,
    name?:string,
    required?:boolean,
    type?:HTMLInputAttribute,
    defaultValue?:string | number,
    placeholder?:string,
    value?:string | number,
    onChange?:(ev: ChangeEvent<HTMLInputElement>) => void,
    step?:string
}

export type ExpenseModalProps = {
    isOpen:boolean,
    onClose: () => void,
    onSubmit: (data: NewExpense) => void,
    expense?: Expense
}

export interface UserDto {
    token:string;
    firstName:string;
    lastName:string;
}

export type Expense = {
    id:number,
    expenseName:string,
    description:string,
    amount:number,
    createdAt: Date,
    type: 'expense' | 'income'
}
export type NewExpense = {
    expenseName:string,
    description:string,
    amount:number,
    expenseType: 'expense' | 'income'
}