"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebase";
import Form from "next/form";
import AppleButton from "@/components/apple";
import Button from "@/components/button";
import Divider from "@/components/divider";
import GoogleButton from "@/components/google";
import Input from "@/components/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/logo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function createUserIfNotExists(
  accessToken: string,
  user: { id: string; name: string; email: string }
) {
  const response = await fetch(`${BASE_URL}create if not exists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to create user in database: " + response.status);
  }
  return await response.json();
}

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      const accessToken = await userCredential.user.getIdToken();
      await createUserIfNotExists(accessToken, {
        id: userCredential.user.uid,
        name: `${firstName} ${lastName}`,
        email,
      });
      router.push("/home/groups");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form action={"/home"} onSubmit={handleSubmit} className="border border-gray-300 sm:w-[300px] lg:w-1/3 rounded-2xl shadow-md p-6 space-y-5">
      <h1 className="font-bold text-3xl flex items-center gap-2"><Logo /> Register</h1>
      <Link
        href="/"
        className="flex items-center gap-0.5 text-xs hover:underline ease-in transition-all duration-200"
      >
        <ArrowLeft size={10} />
        Back to home
      </Link>
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName" className="text-sm">
          First Name
        </label>
        <Input
          placeholder="Enter your First Name"
          id="firstName"
          name="firstName"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="lastName" className="text-sm">
          Last Name
        </label>
        <Input
          placeholder="Enter your Last Name"
          id="lastName"
          name="lastName"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <Input
          placeholder="Enter your Email"
          id="email"
          name="email"
          type="email"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <Input
          placeholder="Enter your Password"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      <p className="text-xs text-right hover:underline">
        <Link href="/auth/signin">Have an account?</Link>
      </p>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <Button
        className="bg-black text-white w-full"
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
      <Divider />
      <AppleButton />
      <GoogleButton />
    </Form>
  );
}
