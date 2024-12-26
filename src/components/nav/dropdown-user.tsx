"use client";

import { Button } from "@/components/ui/button";
import { CircleUser, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { handleSignOut } from "@/actions/cognito-auth";

export default function DropdownUser() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <Link
                        className="sm"
                        href="/account/settings"
                    >
                        <Settings className="mr-2 h-4 w-4"/>
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                    <Button variant={"ghost"}>
                        <LogOut className="mr-2 h-4 w-4"/>
                        <span>Logout</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}