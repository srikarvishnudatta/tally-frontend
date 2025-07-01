import { fetchWithAuth } from "@/utils/fetchWithAuth";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchGroups() {
  const response = await fetchWithAuth(`${BASE_URL}/groups/`, { cache: 'no-store' });
  return await response?.json();
}
export default async function Page(){
  const groups = await fetchGroups();
   return <div>
        <h1 className="text-xl font-bold mb-4">Groups</h1>
        <ul>
          {groups.map((group: any, idx: number) => (
            <li key={group.id || idx} className="mb-2">
              {group.name}
            </li>
          ))}
        </ul>
      </div>
}