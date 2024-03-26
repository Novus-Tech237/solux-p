import { User } from "lucide-react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const TeachersPage = async () => {
    
   
    return ( 
      
        <div className="p-6">
            <div className="flex flex-row items-center gap-x-2 pt-5 pb-5">
                <User className="text-orange-600"/>
                <span className="text-2xl font-bold text-orange-600">Teachers</span>
            </div>
            <DataTable columns={columns} data={[]}/>
        </div>
     );
}
 
export default TeachersPage;