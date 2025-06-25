import Button from "@/components/button"
import {ChartNoAxesCombined, ArrowRight} from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function Hero(){
    return <section className="px-2 md:flex md:justify-between mt-20">
        <div className="md:w-1/2 flex flex-col gap-10">
            <h2 className="flex text-xl font-semibold"><ChartNoAxesCombined />INSTANT SPLIT</h2>
            <h1 className="text-5xl font-bold">Split & Share Expenses with <span className="text-primary">Friends & Family</span> effortlessly</h1>
            <p>The easiest way to split bills with friends and family. Keep track
            of shared expenses and balances.</p>
            <Button className="bg-black text-white"><Link href={"/auth/register"} className="flex items-center justify-center">Get Started Today <ArrowRight /></Link></Button>
        </div>
        <Image src={'/illustration.jpg'} height={500} width={500} alt="illustration" />
    </section>
}