import Image from "next/image"
import { Button } from "./ui/button"
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const LandingHeader = () => {
  return (
    <div className="w-full flex max-w-7xl mx-auto justify-between">
    <div className=" pt-40">
      <h1 className={`text-7xl ${poppins.className}`} >Invest in your </h1>
      <h1 className={`text-5xl pt-4 px-1 font-mono ${poppins.className}`}> point of view</h1>  
      <div className="text-slate-600 pt-6 px-1 font-mono text-xl" > Cricket, entertainment, trade and finance</div>
      <div className="pt-6 ">
        <Button variant="outline" className="mr-2" > Download app</Button>
        <Button> Trade online </Button>  
      </div>
    </div>
    <div >
    <Image src="/header.avif" alt="header" height={600} width={600} /> 
    </div>
    </div>
  )
}


export default LandingHeader
