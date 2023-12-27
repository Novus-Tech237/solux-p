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

interface ConfirmModalProps{
    children: React.ReactNode;
    onConfirm: () => void;
}

export const ConfirmModal =({children, onConfirm}:ConfirmModalProps)=>{
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Sure ?</AlertDialogTitle>
                    <AlertDialogDescription>This action is Irreversible</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}