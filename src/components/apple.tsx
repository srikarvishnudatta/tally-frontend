import Button from "./button";
import logo from "@/assets/apple-icon.svg";
import Image from "next/image";

export default function AppleButton() {
  return (
    <Button className="w-full py-3 flex justify-center items-center gap-2 bg-primary/10" type="button">
           <Image src={logo} alt="website logo" height={25} width={25}/>
           Apple
    </Button>
  )
}