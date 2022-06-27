import { Typography } from "@mui/material";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "../ui/modeToggler";
import Image from "next/image";

function DashboardHeader() {
    return (
        <div className="pl-10 bg-black flex h-[51px] justify-between px-5 items-center fixed top-0 w-full z-20">

            {/* <Typography  variant="h5" p={1} color={"white"}>
                Seller Dashboard
            </Typography> */}
            <Image
                src={'/logo.png'}
                width={300}
                height={300}
                alt="ProMerchants"
                className=""
            />

            <div className=" hidden md:flex gap-0 p-1 w-1/2 items-center bg-white rounded-lg border">

                <Input
                    placeholder={"Search..."}
                    className=" w-full h-full py-0 px-1 m-0 border-0"
                />
                <Button className="bg-white m-0 h-full p-0 mx-2 text-black text-sm hover:text-white">
                    <SearchIcon fontWeight={700} />
                </Button>

            </div>



            {/* The Avatar Circle Starts Here  */}
            <ModeToggle />

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={'/'}>
                            Visit the store <ArrowOutwardRoundedIcon fontSize="small" />
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    );
}

export default DashboardHeader;