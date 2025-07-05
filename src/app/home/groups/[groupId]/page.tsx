import { fetchWithAuth } from "@/utils/fetchWithAuth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type PageProps = {
    params :{
        groupId: number
    }
}

async function fetchGroupById(groupId:number){
    const response = await fetchWithAuth(`${BASE_URL}/groups/${groupId}`, {cache:"no-store"});
    return await response?.json();
}


export default async function Page({params}: PageProps){
    const {groupId} = params;
    const group = await fetchGroupById(groupId)
    return <section>
        <h1 className="text-3xl mt-25 font-bold">
        {group?.groupName}
      </h1>
      <div className="mt-4 bg-white shadow-sm rounded-2xl p-4 w-1/4 bg-back-lt">
      <h2 className="text-lg font-semibold">Balances</h2>
        <ul className="space-y-2 mt-4">
          <li className="flex justify-between">Srikar <span className="text-sm text-gray-300">owes</span> Pranu <span className="text-green-500">$12</span></li>
          <li className="flex justify-between">Pranu owes Vicky <span className="text-red-500">$2</span></li>
          <li className="flex justify-between">Vicky owed Pranu <span>$1</span></li>
        </ul>
      </div>
    </section>
}