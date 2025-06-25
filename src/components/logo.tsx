import Image from "next/image";
import logo from "@/assets/logo.svg"

export default function Logo(){
    return <Image src={logo} height={30} width={30} alt="tally-logo"/>
}