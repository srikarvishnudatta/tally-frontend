'use client';
import { Expense, NewExpense } from "@/types/types"
import ExpenseItem from "./expenseItem";
import Button from "@/components/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewExpenseModal from "./newExpenseModal";

type ExpensesProps = {
    expenses: Expense[]
}

export default function Expenses({expenses}:ExpensesProps){
    const [showModal, setShowModal] = useState(false);
    const handleAddExpense = (data: NewExpense) => {
    console.log(data);
  };
    return <div className="pt-5">
                <Button variant="primary" className="flex gap-2" 
                type="button"
                onClick={() => setShowModal(true)}
                ><Plus />Expense</Button>
        <p className="text-sm font-semibold text-gray-400 border-b border-b-gray-300">Jun, 2025</p>
        {expenses.length ===0 ? <p>No Expenses so far...</p>: 
            <div className="flex flex-col gap-2 mt-2">
            {expenses.map((expense) => <ExpenseItem expense={expense} key={expense.id}/>)}
            </div>}
            <NewExpenseModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddExpense}            
            />
    </div>
}