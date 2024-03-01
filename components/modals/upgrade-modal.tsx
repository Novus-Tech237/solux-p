"use client"

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

interface UpgradeModalProps{
    children: React.ReactNode;
    onSubscribe: () => void;
}

export const UpgradeModal =({children, onSubscribe}:UpgradeModalProps)=>{
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="space-y-4">
                    <AlertDialogTitle className="text-center text-2xl">Upgrade to Solux Pro</AlertDialogTitle>
                    <AlertDialogDescription className="text-center space-y-2">Have Access to Online Classes and Mentorship with Solux Experts to build real-time projects</AlertDialogDescription>
                    <Separator/>
                    <AlertDialogDescription><p className="text-xl font-medium">10.000 FCFA / mo</p></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onSubscribe}>Subscribe</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}