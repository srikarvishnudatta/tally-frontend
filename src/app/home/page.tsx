import Link from "next/link";
import Image from "next/image";
import solo from "@/assets/solo.jpg";
import group from "@/assets/group.jpg"
export default function HomePage(){
   
    return <section className="flex justify-center gap-10 items-center grow flex-col md:flex-row">
        <div className="border border-dashed border-gray-400 p-4 hover:opacity-80">
            <Image src={solo} height={300} width={300} alt="solo pic"/>
            <Link href={"/home/personal"} className="text-center">Personal Expenses</Link>
        </div>
        <div className="border border-dashed border-gray-400 p-4 hover:opacity-80">
            <Image src={group} height={300} width={300} alt="group pic"/>
            <Link href={"/home/groups"}>Group Expenses</Link>
        </div>
    </section>
}