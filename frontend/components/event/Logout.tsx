"use client"

import React, { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { IoIosLogOut } from "react-icons/io";
import clsx from "clsx";
import { MdKeyboardArrowDown } from "react-icons/md";

type Props = {
  classes? : string
}

const Logout = ({classes}:Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onSubmit = () => {
    localStorage.clear()
    router.push("/") // Navigate to home after logout
  }

  return (
    <div
      className={clsx("relative border-gray-700 flex items-center rounded-full cursor-pointer", classes)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Profile Image */}
      <Image src="/userprofile.avif" width={40} height={30} alt="user" />
      <MdKeyboardArrowDown className="text-2xl" />

      {/* Dialog on Hover */}
      {open && (
        <div className="absolute top-11 left-1/2 -translate-x-1/2 w-32 bg-white border rounded-lg shadow-lg p-2 z-50">
          <Button
            variant="destructive"
            className="w-full"
            onClick={onSubmit}
          >
            <IoIosLogOut className="text-bold text-white" />
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default Logout
