import { Group } from "@/types/types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import GroupComponent from "./group";
import Button from "@/components/button";
import { Plus } from "lucide-react";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchGroups() {
  const response = await fetchWithAuth(`${BASE_URL}/groups/`, { cache: 'no-store' });
  return await response?.json();
}
export default async function Page(){
  const groups = await fetchGroups();
   return <div>
        <h1 className="text-xl font-bold mb-4">Groups</h1>
        <Button variant="primary" className="flex gap-2 items-center"><Plus size={16}/>Group</Button>
        <ul>
          {groups?.map((group: Group) => (
            <GroupComponent {...group} key={group.id}/>
          ))}
        </ul>
      </div>
}