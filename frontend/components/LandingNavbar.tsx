'use client'

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";
import axios from "axios";

const LandingNavbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleTradeOnlineClick = () => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      // Redirect to events page if username exists
      router.push("/event");
    } else {
      // Open dialog if no username in localStorage
      setIsDialogOpen(true);
    }
  };

  const handleUsernameSubmit = async () => {
    if (username.trim()) {
      try {
        const response = await axios.post(
          `http://localhost:3001/user/create/${username.trim()}`,
          {},
        );

        if (response.status === 200) {
          // Save username in localStorage if request succeeds
          localStorage.setItem("username", username.trim());
          setIsDialogOpen(false);
          router.push("/event");
        } else {
          console.error("Failed to create username");
          alert("There was an error creating your username.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Unable to reach the server. Please try again later.");
      }
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <nav className="w-full">
      <div className="flex max-w-7xl justify-between mx-auto p-3">
        <div className="flex font-mono items-center">
          <Image
            src="/probo.avif"
            alt="logo"
            height={100}
            width={100}
            className="mr-6"
          />
          <p className="text-slate-500 px-2 text-sm pt-1"> Trading </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> Team 11 </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> Read </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> Explore </p>
          <p className="text-slate-500 px-2 text-sm pt-1"> careers </p>
        </div>
        <div className="items-center flex">
          <div className="items-end font-sans ">
            <p className="pt-1 text-xs text-right font-sans mr-4">
              {" "}
              For 18 years and <br /> above only
            </p>
          </div>
          <Button className="font-bold mr-2 px-6" variant="outline">
            {" "}
            Download app{" "}
          </Button>
          <Button className="font-bold px-6" onClick={handleTradeOnlineClick}>
            {" "}
            Trade online{" "}
          </Button>
        </div>
      </div>
      <Separator className="max-w-7xl mx-auto" />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent>
          <h2> Welcome! Set a username to get started!</h2>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
          <Button onClick={handleUsernameSubmit}> Submit </Button>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default LandingNavbar;
