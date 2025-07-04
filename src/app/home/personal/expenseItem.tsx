"use client";
import DropdownMenu from "@/components/expensedropdown";
import { Expense, NewExpense } from "@/types/types";
import { DollarSign } from "lucide-react";
import NewExpenseModal from "./newExpenseModal";
import { useState } from "react";
import  useFetchClient  from "@/utils/fetchClient";
import { useToast } from "@/components/toast/useToast";
import { useRouter } from "next/navigation";
import { formatIsoToCustom } from "@/utils/dateConverter";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type ExpenseItemProps = {
  expense: Expense;
};

export default function ExpenseItem({ expense }: ExpenseItemProps) {
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const fetchClient = useFetchClient();
  const onEdit = async (data: NewExpense) => {
     const response = await fetchClient(`${BASE_URL}/expenses/personal/${expense.id}`,{
          method:"PUT",
          body: JSON.stringify(data)
        });  
        if(response?.ok){
          toast("Expense updated")
          setShowModal(false);
          router.refresh();
        }
  };
  const onDelete = async (id:number) => {
   const response = await fetchClient(`${BASE_URL}/expenses/personal/${id}`,{
          method:"DELETE",
        });  
        if(response?.ok){
          toast("expense deleted!");
          setShowModal(false);
          router.refresh();
        } 
  };
  return (
    <>
    <div className="flex justify-between px-4 py-6 border border-gray-200 rounded-md shadow-md">
      <div>
        <h3 className="text-lg font-semibold">{expense.expenseName}</h3>
        <p className="text-sm text-gray-500">{formatIsoToCustom(expense.createdAt)}</p>
      </div>
      <div className="flex gap-2 ">
        <div className="flex items-center text-xl text-red-500">
          <DollarSign size={16}/> {expense.amount}
        </div>
        <DropdownMenu
          onEdit={() => setShowModal(true)}
          onDelete={() => onDelete(expense.id)}
        />
      </div>
    </div>
    <NewExpenseModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={onEdit} expense={expense}/>
    </>
  );
}
