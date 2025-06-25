import Button from "@/components/button";
import Logo from "@/components/logo";
import Link from "next/link";

export default function Navbar(){
    return <nav className="flex justify-between items-center px-2">
        <h2 className="flex items-center gap-2 font-semibold text-xl">
            <Logo />
            SplitsApp
        </h2>
        <ul className="hidden md:flex gap-4">
            <li>About us</li>
            <li>Features</li>
            <li>Reviews</li>
            <li>Newsletter</li>
        </ul>
        <div className="flex gap-2 items-baseline">
            <Button className="bg-black text-white"><Link href={"/auth/register"}>Register</Link></Button>
            <Button variant="primary"><Link href={"/auth/signin"}>Login</Link></Button>
        </div>
    </nav>
}