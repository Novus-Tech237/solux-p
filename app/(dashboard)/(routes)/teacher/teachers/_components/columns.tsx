"use client"

import { useUser } from "@clerk/nextjs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export type TeachersColumn ={
    id: string,
    username: string,
    email: string,
    status: "pending" | "active"
}

export const columns: ColumnDef<TeachersColumn>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;
            return (
                <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-8 p-0">
                   <span className="sr-only">Open Menu</span> 
                   <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={`/teacher/courses/${id}`}>
                    <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
            )
        }
    },

]