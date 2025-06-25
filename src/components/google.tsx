import Button from "./button";
import logo from "@/assets/google-icon.svg";
import Image from "next/image";
function GoogleButton() {
  return (
   <Button className="w-full py-3 flex justify-center items-center gap-2 bg-primary/10" type="button">
           <Image src={logo} alt="website logo" height={25} width={25}/>
           Google
    </Button>
  )
}

export default GoogleButton