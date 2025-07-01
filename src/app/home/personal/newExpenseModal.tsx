"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import { ExpenseModalProps } from "@/types/types";
import {  FormEvent, useRef } from "react";

const NewExpenseModal = ({ isOpen, onClose, onSubmit }: ExpenseModalProps) => {
  const modalRef = useRef(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const expenseName = formData.get("expenseName") as string;
    const description = formData.get("description") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const type = formData.get("type") as 'income' | 'expense';
    onSubmit({ expenseName, description, amount, type });
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
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fadeIn scale-100 transition-all duration-200"
        ref={modalRef}
      >
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="expenseName"
            placeholder="Name"
            required
            className="w-full border px-4 py-2 rounded-md"
          />
          <Input
            name="description"
            placeholder="Description"
            required
            className="w-full border px-4 py-2 rounded-md"
          />
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            required
            step="any"
            className="w-full border px-4 py-2 rounded-md"
          />
           <select
            name="type"
            className="w-full border px-4 py-2 rounded-md"
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
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
