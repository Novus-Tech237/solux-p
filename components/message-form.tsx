"use client"

import { Ana } from "@prisma/client";
import ChatMessage, { AnaChatMessageProps } from "@/components/chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface MessageFormProps{
    messages: AnaChatMessageProps[];
    isLoading: boolean;
    ana: Ana;
}

export const MessageForm = ({messages=[], ana, isLoading}: MessageFormProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null);
    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setFakeLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        }
    }, []);
    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({behavior: "smooth"})
    },[messages.length])
    return(
        
            <div className="flex-1 overflow-y-auto pr-4">
                <ChatMessage
                    isLoading={fakeLoading}
                    role="system"
                    content={"Hello I am ANA, how can I help you?"}
                />
                {messages.map((message)=>(
                    <ChatMessage
                        key={message.content}
                        role={message.role}
                        content={message.content}
                    />
                ))}
                {isLoading && (
                    <ChatMessage
                        role="system"
                        isLoading
                    />
                )}
            <div ref={scrollRef}/>
            </div>
        
    )
}