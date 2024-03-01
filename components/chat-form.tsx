"use client"

import { ChangeEvent, FormEvent } from "react";
import { ChatRequestOptions } from "ai"
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { RiSendPlaneFill } from "react-icons/ri";
import { SendHorizonal } from "lucide-react";

interface ChatFormProps{
    input: string;
    handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    isLoading: boolean;
}

export const ChatForm = ({input, handleInputChange, onSubmit, isLoading}: ChatFormProps) => {
    return(
        <div className="m-5">
            
            <form 
            onSubmit={onSubmit}
            className="border-t border-gray py-4 flex items-center gap-x-2"
            >
            <Input
                disabled={isLoading}
                value={input}
                onChange={handleInputChange}
                placeholder="What is your question?"

            />
            <Button disabled={isLoading} variant={"ghost"}>
                <SendHorizonal size={30} className="text-orange-500"/>
            </Button>
            </form>
        </div>
    )
}