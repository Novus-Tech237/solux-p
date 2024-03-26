"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import toast from "react-hot-toast"
import axios from "axios";

interface SubscriptionButtonProps {
    isPro: boolean;
}

const SubscriptionButton = ({isPro = false}:SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe")
            window.location.href = response.data.url;
        }catch(error){
            toast.error("Ouch!...Something went wrong")
        }finally{
            setLoading(false)
        }
    }
    return (
        <Button onClick={onClick} disabled={loading} >
            {isPro ? "Manage Subscription" : "Upgrade"}
            {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white"/>}
        </Button>
    )
}
export default SubscriptionButton