"use client"

import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { BotAvatar } from "@/components/bot-avatar";
import { BeatLoader } from "react-spinners"
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export interface AnaChatMessageProps {
    role: "system" | "user",
    content?: string;
    isLoading?: boolean;
}
const AnaChatMessage = ({role, content, isLoading}: AnaChatMessageProps) => {
    const onCopy = () => {
        if(!content){
            return;
        }
        navigator.clipboard.writeText(content);
        toast.success("Copied to Clipboard");
    }
    return ( 
        <div className={cn(
            "group flex items-start gap-x-3 py-4 w-full",
            role === "user" && "justify-end"
        )}>
            {role !== "user" && <BotAvatar/>}
            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-orange-50">
                {isLoading ? <BeatLoader color={"black"} size={5}/> : content}
            </div>
            {role === "user" && <UserAvatar/>}

            {role !== "user" && !isLoading && (
                <Button
                    onClick={onCopy}
                    className="opacity-100 transtion"
                    size="icon"
                    variant="ghost"
                >
                <Copy className="w-4 h-4"/>
                </Button>
            )}
        </div>
            
     );
}
 
export default AnaChatMessage;