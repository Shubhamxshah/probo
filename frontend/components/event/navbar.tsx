"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoHomeOutline, IoHome } from "react-icons/io5";
import { RiShoppingBag4Line, RiShoppingBag4Fill } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import axios from "axios";
import Logout from "./Logout";
import { Separator } from "../ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = () => {
  const pathname = usePathname();
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<number>();
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchBalance = async () => {
      const username = localStorage.getItem("username");
      if (username) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"}/balances/inr/${username}`,
          );
          const newbalance = response.data.balance / 100;
          setBalance(newbalance || 0);
        } catch (error) {
          console.error("error fetching balance: ", error);
        }
      }
    };

    fetchBalance();
  }, []);

  const onramp = async () => {
    try {
      const multipliedAmount = amount!*100;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"}/onramp/inr`,
        {
          userId: `${localStorage.getItem("username")}`,
          amount: multipliedAmount,
        },
      );
      console.log(response)
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto p-3 items-center justify-between">
        <Image
          src="/probo.avif"
          alt="logo"
          height={100}
          width={100}
          className="mr-6"
        />

        <div className="flex mr-2 pt-2">
          {pathname === "/event" ? (
            <Link href="/event">
              <div className="flex flex-col items-center justify-end">
                <IoHome className="text-xl" />
                <p className="text-sm text-gray-700"> Home </p>
              </div>
            </Link>
          ) : (
            <Link href="/event">
              <div className="flex flex-col items-center justify-center">
                <IoHomeOutline className="text-xl" />
                <p className="text-sm text-gray-700"> Home </p>
              </div>
            </Link>
          )}

          {pathname === "/event/portfolio" ? (
            <Link href="/event/portfolio">
              <div className="flex flex-col items-center justify-center">
                <RiShoppingBag4Fill className="text-xl mx-8" />
                <p className="text-sm text-gray-700"> Portfolio </p>
              </div>
            </Link>
          ) : (
            <Link href="/event/portfolio">
              <div className="flex flex-col items-center justify-center">
                <RiShoppingBag4Line className="text-xl mx-8" />
                <p className="text-sm text-gray-700"> Portfolio </p>
              </div>
            </Link>
          )}

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="border border-gray-600 rounded p-2 flex items-center cursor-pointer ">
                <CiWallet className="text-xl" />
                <MdCurrencyRupee className=" ml-2 text-sm" />
                <p>{balance?.toFixed(2)}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <h2>Enter amount to onramp in your account</h2>
              <Input
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <Button variant="default" onClick={onramp}>
                Submit
              </Button>
            </DialogContent>
          </Dialog>

          <Logout classes="ml-4" />
        </div>
      </div>
      <Separator className="max-w-7xl mx-auto" />
    </>
  );
};

export default Navbar;
