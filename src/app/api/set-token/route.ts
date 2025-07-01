import {cookies} from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const {token} = await req.json();
    if(typeof token !== "string"){
        return NextResponse.json({status: 400});
    }
    (await cookies()).set('firebase_token', token, {
         httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 60
    });
    return NextResponse.json({status: token});
}