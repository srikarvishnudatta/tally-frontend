
import Expenses from "./expenses";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


async function getExpenses(){
    const response = await fetchWithAuth(`${BASE_URL}/expenses/personal/`, {cache: 'no-store'});
    return await response?.json();
}

export default async function Personal(){
    const expenses = await getExpenses();
    return <section className="px-2 mt-10">
        <h1 className="text-3xl font-bold">Your Personal Expenses</h1>
        <p className="text-sm text-gray-500">Here you can view your personal expenses you have made so far.</p>
        <div className="flex justify-between gap-2 my-5">
            <div className="p-4 border border-gray-100 grow  rounded-xl shadow-sm">
                <h2>
                    Your monthly expenses
                </h2>
                <div className="text-xl text-red-500 font-bold">$<span>1230</span></div>
            </div>
            <div className="border border-gray-100 grow p-4 rounded-xl shadow-sm">
                <h2>
                    Your Income this month
                </h2>
                <div className="text-xl text-green-500 font-bold">$<span>12300</span></div>
            </div>
        </div>
        <Expenses expenses={expenses}/>
    </section>
}