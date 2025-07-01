import Logo from "@/components/logo";
import { Banknote, Home, Receipt, Users } from "lucide-react";
import Link from "next/link";

export default function HomeNavbar(){
    return <nav className="flex justify-between items-center px-2 pt-4">
        <h2 className="flex items-center gap-2 font-semibold text-xl">
            <Logo />
            <Link href={"/home"}>Tally</Link>
        </h2>
        <ul className="hidden md:flex gap-4">
            <li className="navlink"><Link href={"/home"} className="navlist">
            <Home size={16}/>
            <span>Home</span></Link></li>
            <li className="navlink"><Link href={"/home/expenses"} className="navlist"><Banknote size={16}/>Expenses</Link></li>
            <li className="navlink"><Link href={"/home/groups"} className="navlist"><Receipt size={16}/>Groups</Link></li>
            <li className="navlink"><Link href={"/home/friends"} className="navlist"><Users size={16}/>Friends</Link></li>
            <li>Account</li>
        </ul>
    </nav>
}