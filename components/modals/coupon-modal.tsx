import{
    AlertDialog,
    AlertDialogHeader,      
    AlertDialogTrigger,    
    AlertDialogTitle,    
    AlertDialogAction,    
    AlertDialogCancel,    
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CouponModalProps{
    children: React.ReactNode;
    onSubscribe: (couponCode: string) => void;
    courseId: string;
}

export const CouponModal =({children, onSubscribe, courseId}:CouponModalProps)=>{
    const [couponCode, setCouponCode] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const isButtonDisabled = couponCode !== 'SYNERGY2024' && couponCode !== 'IDAYA237';
    const onPay = async () => {
        console.log(courseId)
        onSubscribe(couponCode);
        try {
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
            window.location.assign(response.data.url)
        } catch(error) {
            console.log(error);
            toast.error("Something went wrong")
        } 
    }
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="space-y-4">
                    <AlertDialogTitle className="text-center text-2xl">Coupon Code</AlertDialogTitle>
                    <AlertDialogDescription className="text-center space-y-2">Enter the coupon code to have nice discounts on our products</AlertDialogDescription>
                    <Separator/>
                    <Input value={couponCode} onChange={e => setCouponCode(e.target.value)}></Input>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onPay} disabled={isButtonDisabled}>Purchase</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}