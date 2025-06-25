import {auth} from "@/utils/firebase";
import { getIdToken } from "firebase/auth";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchGroups(accessToken: string) {
  const response = await fetch(BASE_URL + "groups/", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Cannot fetch the data : " + response.status);
  }
  return await response.json();
}
export default async function Page(){
    try {
    const user = auth.currentUser;
    const token = await getIdToken(user!);
    const groups = await fetchGroups(token);

    if (!groups || groups.length === 0) {
      return <div>No groups found.</div>;
    }
    return (
      <div>
        <h1 className="text-xl font-bold mb-4">Groups</h1>
        <ul>
          {groups.map((group: any, idx: number) => (
            <li key={group.id || idx} className="mb-2">
              {group.name}
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (err: any) {
    return <div className="text-red-500">{err.message || "Failed to fetch groups"}</div>;
  } 
    }