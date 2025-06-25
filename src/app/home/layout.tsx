'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/auth/signin");
        return;
      }
      try {
        const token = await getIdToken(user, true);
        if (!token) {
          router.replace("/auth/signin");
        }
        // Optionally, you can send the token to your backend for further validation here
      } catch {
        router.replace("/auth/signin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}