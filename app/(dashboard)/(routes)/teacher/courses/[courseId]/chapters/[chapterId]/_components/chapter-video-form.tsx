"use client"

import * as solux from "zod"
import axios from "axios"
import MuxPlayer from "@mux/mux-player-react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { Chapter, Course, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";
import Image from "next/image"
interface ChapterVideoFormProps{
   initialData: Chapter & { muxData?: MuxData | null };
   chapterId: string;
   courseId: string;
}
const formSchema = solux.object({
   videoUrl: solux.string().min(1, {message: "Video is required !"})
})
export const ChapterVideoForm = ({initialData, courseId, chapterId}:ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const toggleEdit = () => setIsEditing((current)=>!current); 
  const router = useRouter();
   const onSubmit = async (values: solux.infer<typeof formSchema>) =>{
     try{
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
        toast.success("Chapter Updated");
        toggleEdit();
        router.refresh();
     }catch{
        toast.error("Something went wrong!")
     }
   }
   return(
       <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">Chapter Video
           <Button onClick={toggleEdit} variant="ghost">
              {isEditing && (<>Cancel</>)}
              {!isEditing && !initialData.videoUrl &&
                (<>
                    <PlusCircle className="h-4 w-4 mr-2"/>
                    Add Video
                 </>) }
              {!isEditing && initialData.videoUrl &&
                (<>
                    <Pencil className="h-4 w-4 mr-2"/>
                    Edit Video
                 </>) }
              
           </Button>
        </div>
        {!isEditing && (
           !initialData.videoUrl ?(
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <VideoIcon className="h-10 w-10 text-slate-500"/>
            </div>
           ):(
            <div className="relative aspect-video mt-2">
                <MuxPlayer 
                  playbackId = {initialData?.muxData?.playerId || ""}
                 
                />
            </div>
           )
        )}
        {isEditing && (
           <div>
            <FileUpload 
                endpoint="chapterVideo"
                onChange={(url)=>{if(url){
                  onSubmit({ videoUrl: url });
                }}}
            />
            <div className="text-xs text-muted-foreground mt-4">Upload this chapter&apos;s video </div>
           </div>
        )}
        {initialData.videoUrl && !isEditing && (
            <div className="text-xs text-muted-foreground mt-2">
                Videos can take a few minutes to process. Refresh the page if video does not appear
            </div>
        )}
       </div>
   )
}