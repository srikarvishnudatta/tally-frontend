import { fetchWithAuth } from "@/utils/fetchWithAuth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function fetchGroupById(groupId:number){
    const response = await fetchWithAuth(`${BASE_URL}/groups/${groupId}`, {cache:"no-store"});
    return await response.json();
}

export default async function Page(){
    const group = await fetchGroupById()

}