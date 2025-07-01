"use client";
import DropdownMenu from "@/components/expensedropdown";
import { Expense } from "@/types/types";
import { DollarSign } from "lucide-react";

type ExpenseItemProps = {
  expense: Expense;
};

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const onEdit = (id:number) => {
    alert(`Edit expense with ID: ${id}`);
  };

  const onDelete = (id:number) => {
    alert(id);
  };
  return (
    <div className="px-4 py-2 border border-gray-200 rounded-md shadow-md">
      <div className="flex justify-end">
        <DropdownMenu
          onEdit={() => onEdit(expense.id)}
          onDelete={() => onDelete(expense.id)}
        />
      </div>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{expense.expenseName}</h3>
        <div className="flex items-center text-xl text-red-500">
          <DollarSign size={16}/> {expense.amount}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{expense.createdAt.toString()}</p>
      </div>
    </div>
  );
}
