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
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
        </AlertDialog>
    )
}