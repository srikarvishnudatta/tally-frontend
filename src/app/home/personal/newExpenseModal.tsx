"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { ExpenseModalProps } from "@/types/types";
import {  FormEvent, useRef } from "react";

const NewExpenseModal = ({ isOpen, onClose, onSubmit, expense }: ExpenseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const expenseName = formData.get("expenseName") as string;
    const description = formData.get("description") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const expenseType = formData.get("type") as 'income' | 'expense';
    onSubmit({ expenseName, description, amount, expenseType });
    onClose();
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-10 animate-fadeIn scale-100 transition-all duration-200"
        ref={modalRef}
      >
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="expenseName"
            defaultValue={expense?.expenseName}
            placeholder="Name"
            required
            className="w-full border px-4 py-2 rounded-md"
          />
          
          <Input
            type="number"
            name="amount"
            defaultValue={expense?.amount}
            placeholder="Amount"
            required
            step="any"
            className="w-full border px-4 py-2 rounded-md"
          />
           <select
            name="type"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            required
            defaultValue={expense?.type}
          >
            <option value="expense" >Expense</option>
            <option value="income" >Income</option>
          </select>
          <textarea
            name="description"
            placeholder="Description"
            defaultValue={expense?.description}
            required
            
            className="w-full h- border border-gray-300 px-4 py-2 rounded-md"
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              variant="destructive"
              className="px-4 py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="px-4 py-2 rounded-md"
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewExpenseModal;
