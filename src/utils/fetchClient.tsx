'use client';
import {auth} from "@/utils/firebase"
import  { useRouter } from "next/navigation";
export default function useFetchClient(){
    const router = useRouter();
    return async function  fetchClient(input: RequestInfo, init?:RequestInit){
     try {
            const token = await auth.currentUser?.getIdToken();
           
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
            console.log(response)
            // if(response.status === 403){
            //     throw new Error("Invalid token");
            // }
            return response;
        } catch (error) {
            console.log(error);
            if (typeof window !== "undefined") {
                router.replace("/auth/signin");
            }
        }
}
}