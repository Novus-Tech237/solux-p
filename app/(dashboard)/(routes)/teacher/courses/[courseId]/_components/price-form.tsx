"use client"

import * as solux from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

interface PriceFormProps{
   initialData: Course;
   courseId: string;
}
const formSchema = solux.object({
   price: solux.coerce.number(),
})
export const PriceForm = ({initialData, courseId}:PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current)=>!current); 
  const router = useRouter();
   const form = useForm<solux.infer<typeof formSchema>>({resolver: zodResolver(formSchema), defaultValues: {price: initialData?.price || undefined},});
   const { isSubmitting, isValid } = form.formState;
   const onSubmit = async (values: solux.infer<typeof formSchema>) =>{
     try{
        await axios.patch(`/api/courses/${courseId}`, values);
        toast.success("Course Updated");
        toggleEdit();
        router.refresh();
     }catch{
        toast.error("Something went wrong!")
     }
   }
   return(
       <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">Course Price
           <Button onClick={toggleEdit} variant="ghost">
           {isEditing && (<>Cancel</>)}
           {!isEditing && !initialData.imageUrl &&
                (<>
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    Add Price
                 </>) }
                 {!isEditing && initialData.imageUrl &&
                (<>
                    <Pencil className="h-4 w-4 mr-2"/>
                    Edit Image
                 </>) }
           </Button>
        </div>
        {!isEditing && (
           <p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}> {initialData.price ? formatPrice(initialData.price): "Add Course Price"}</p>
        )}
        {isEditing && (
           <Form {...form}>
              <form
                 onSubmit={form.handleSubmit(onSubmit)}
                 className="space-y-4 mt-4"
              >
              <FormField 
                 control={form.control}
                 name="price"
                 render={({field})=>(
                    <FormItem>
                       <FormControl>
                        
                          <Input
                             disabled={isSubmitting}
                             placeholder="Set Course Price"
                             {...field}
                          />
                       </FormControl>
                       <Button 
                       disabled={!isValid || isSubmitting}
                       type="submit"
                       >Save</Button>
                    </FormItem>
                 )}
              />
              </form>
           </Form>
        )}
       </div>
   )
}