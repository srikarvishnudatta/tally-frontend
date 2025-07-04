import { redirect } from 'next/navigation';
import {cookies} from "next/headers"
export async function fetchWithAuth(input: RequestInfo, init?:RequestInit){
    try {
        const token = (await cookies()).get('firebase_token')?.value;
       
        if (!token) {
        throw new Error('No auth token found in cookie');
        }
        const response = await fetch(input, {
            ...init,
            headers: {
                'Content-type':'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        if(response.status === 403){
            throw new Error("Invalid token");
        }
        return response;
    } catch (error) {
        console.log(error);
       // redirect("/auth/signin");
    }
}