'use client';
import Form from "next/form";
import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import Input from "@/components/input";
import Button from "@/components/button";
import Divider from "@/components/divider";
import AppleButton from "@/components/apple";
import GoogleButton from "@/components/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
export default function Signin() {
  const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

  async function signInHandler(ev: FormEvent<HTMLFormElement>){
    ev.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(ev.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const token = await credentials.user.getIdToken();
      await fetch('/api/set-token', {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify({token})
      })
      router.push("/home")
    }catch(error){
      setError("invalid credentials or account doesnt exist");
    } finally{
      setLoading(false);
    }
  }
  return (
    <Form action={"/home"} className="border border-gray-300 sm:w-[300px] lg:w-1/3 rounded-2xl shadow-md p-6 space-y-5" onSubmit={signInHandler}>
      <h1 className="font-bold text-3xl flex gap-2 items-center"><Logo />Login</h1>
      <Link
        href={"/"}
        className="flex items-center gap-0.5 text-xs hover:underline ease-in transition-all duration-200"
      >
        <ArrowLeft size={10} />
        Back to home
      </Link>
      {error && (
                <div className="flex items-center justify-center text-center text-red-500 text-xs mb-2 gap-2">
                    <Info size={16} className="inline-block" />
                    <span>{error}</span>
                </div>
            )}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">Email</label>
          <Input
            placeholder="Enter your Email"
            className={error ? "border-red-500" : ""}
            id="email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm">Password</label>
          <Input
            placeholder="Enter your Password"
            className={error ? "border-red-500" : ""}
            id="password"
            name="password"
            required
          />
        </div>
        <p  className="text-xs text-right hover:underline"><Link href={"/"}>Forgot Password?</Link></p>
        <Button className="bg-black text-white w-full" type="submit" disabled={loading}>
            Login
        </Button>
        <Divider />
        <AppleButton />
        <GoogleButton />
    </Form>
  );
}