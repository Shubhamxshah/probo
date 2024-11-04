import Image from "next/image"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import Link from "next/link"

const LandingNavbar = () => {
  return (
    <nav className="w-full">
      <div className="flex max-w-7xl justify-between mx-auto p-3">
        <div className="flex font-mono items-center">
          <Image src="/probo.avif" alt="logo" height={100} width={100} className="mr-6" />
          <p className="text-slate-500 px-2 text-sm pt-1"> Trading </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> Team 11 </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> Read </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> cares</p>
          <p className="text-slate-500 px-2 text-sm pt-1"> careers </p>

        </div>
        <div className="items-center flex">
          <div className="items-end font-sans ">
            <p className="pt-1 text-xs text-right font-sans mr-4"> For 18 years and <br /> above only</p>
          </div>
          <Button className="font-bold mr-2 px-6" variant="outline" > Download app </Button>
          <Button className="font-bold px-6" > <Link href="/event">Trade  online</Link></Button>
        </div>
      </div>
      <Separator className="max-w-7xl mx-auto" />
    </nav>
  )
}

export default LandingNavbar
