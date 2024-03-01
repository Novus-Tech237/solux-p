"use client"

import { CouponModal } from "@/components/modals/coupon-modal";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTicketAlt } from 'react-icons/fa';


export const CouponCourse = () => {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubscribe = async ({params}:{params:{courseId: string}}) => {
      try {
        setLoading(true);
        const response = await axios.get(`api/courses/${params.courseId}/checkout`);
        router.refresh()
        window.location.href = response.data.url;
      } catch (error) {
          toast.error("Something went wrong")
        } finally {
            setLoading(false);
          }
      };

    return (
        <CouponModal onSubscribe={onSubscribe} courseId={params.courseId}>
            <Button variant={"outline"}>
                <FaTicketAlt size={24} className="mr-2 text-orange-500"/>
                <p>I have Coupon</p>
            </Button>
        </CouponModal>
        
    )
}