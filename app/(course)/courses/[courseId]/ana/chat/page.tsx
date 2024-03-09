"use client"

import { ChatForm } from "@/components/chat-form";
import { useRouter } from "next/navigation";
import { FaRobot } from "react-icons/fa";
import  { Ana, Message } from "@prisma/client"
import { MessageForm } from "@/components/message-form";
import { AnaChatMessageProps } from "@/components/chat-message";
import { useCompletion } from "ai/react";
import { FormEvent, useState, useEffect } from "react";
import axios from "axios";

const AnaClientPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }
  const sendMessage = (message) => {
    const url = '/api/chat';

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "user", "content": message }]
    };
    
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

export default AnaClientPage;