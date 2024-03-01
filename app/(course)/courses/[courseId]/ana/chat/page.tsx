"use client"

import { ChatForm } from "@/components/chat-form";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import  { Ana, Message } from "@prisma/client"
import { useCompletion } from "ai/react";
import { MessageForm } from "@/components/message-form";
import { ChatRequestOptions } from "ai";
import { AnaChatMessageProps } from "@/components/chat-message";

interface AnaChatProps {
    ana: Ana & {
        messages: Message[];
    }
}
const AnaChatPage = ({ ana }:AnaChatProps) => {
    const router = useRouter()
    const [messages, setMessages] = useState<AnaChatMessageProps[]>(ana?.messages || [])
    const {input, isLoading, handleInputChange, handleSubmit, setInput} = useCompletion({
        api: `/api/anachat`,
        onFinish(prompt, completion){
            const systemMessage: AnaChatMessageProps = {
                role: "system",
                content: completion,
            };
            setMessages((current)=>[...current, systemMessage]);
            setInput("");
            router.refresh();
        }
    });
    const onSubmit = (e: FormEvent<HTMLFormElement>)=>{
        const userMessage: AnaChatMessageProps = {
            role: "user",
            content: input,
        };
        setMessages((current)=>[...current, userMessage]);
        handleSubmit(e)
    } 
  return (
    <>
    <div className="flex flex-col h-full space-y-2 p-4">
    <div className="bg-gray-200 rounded-5 shadow-md p-4">
          <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                  <FaRobot size={50} className="mr-4 animate-bounce" />
                  <p className="text-4xl font-bold text-orange-600">ANA</p>
              </div>
              <div className="mb-2 w-full p-3 text-slate-400">
                  <p className="text-center">Your general-purpose assistant bot with strengths in programming related tasks, course related questions and non-English language</p>
                  <p className="text-center">Powered by OpenAI</p>
              </div>
          </div>
      </div>
      
      <MessageForm
                  isLoading={isLoading}
                  messages={messages} ana={{
                      id: "",
                      userId: "",
                      seed: ""
                  }}      />
        
            <ChatForm 
              isLoading={isLoading}
              input={input}
              handleInputChange={handleInputChange}
              onSubmit={onSubmit}
            />
      
    
      </div>
      </>

  );
}

export default AnaChatPage;