"use client"

import { Category } from "@prisma/client"
import { FcEngineering, FcGallery, FcFlashOn, FcCommandLine, FcMultipleDevices  } from "react-icons/fc"
import { IoMdFlash } from  "react-icons/io"
import { IconType } from "react-icons/"
import { CategoryItem } from "./category-item";
interface CategoriesProps{
    items: Category[];
}
const iconMap: Record<Category["name"], IconType> = {
    "Computer Science": FcMultipleDevices,
    "Graphic Design": FcGallery,
    "Framework Development": FcFlashOn,
    "Programming": FcCommandLine
}
export const Categories = ({items}:CategoriesProps) => {
    return(
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
        {items.map((item)=>(
            <CategoryItem
                key={item.id}
                label={item.name}
                icon={iconMap[item.name]}
                value={item.id}
            />
            
        ))}
        </div>
    )
}